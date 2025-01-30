require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3002;
const path = require('path');

// Serve static files with proper MIME types
app.use('/dist', express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));
app.use('/icons', express.static(path.join(__dirname, 'icons')));
app.use(express.static('public'));
app.use('/components', express.static('components'));

// Initialize AWS S3 (MinIO)
const s3Client = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || 'admin',
        secretAccessKey: process.env.MINIO_SECRET_KEY || 'my-secret-pw'
    },
    region: 'us-east-1', // Required but not used by MinIO
    forcePathStyle: true
});

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Function to get image from MinIO
async function getImageFromMinIO(objectKey) {
    const params = {
        Bucket: process.env.MINIO_BUCKET_NAME || 'my-bucket',
        Key: objectKey
    };
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);
    return Buffer.concat(await response.Body.toArray());
}

// Function to transcribe image using OpenAI
async function transcribeImage(imageBuffer) {
    try {
        const base64Image = imageBuffer.toString('base64');
        const messages = [
            {
                role: "user",
                content: [
                    { type: "text", text: "transcribe. just the transcript. no need to say opening/closing like 'Let me know if you need anything else!'" },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/png;base64,${base64Image}`,
                            detail: "high"
                        }
                    }
                ]
            }
        ];

        const response = await openai.chat.completions.create({
            // model: "gpt-4-turbo",
            // model: "gpt-4o",
            model: "gpt-4o-mini",
            messages: messages,
            store: true
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API error:', error);
        throw error;
    }
}

// Function to process new images
async function processNewImages() {
    const client = await connectToMongo();
    try {
        const db = client.db(dbName);
        const collection = db.collection('minio_bucket');
        
        const unprocessed = await collection.find({
            transcription: { $exists: false }
        }).toArray();

        for (const doc of unprocessed) {
            try {
                console.log(`Processing image: ${doc.objectKey}`);
                const imageBuffer = await getImageFromMinIO(doc.objectKey);
                const transcription = await transcribeImage(imageBuffer);
                
                await collection.updateOne(
                    { _id: doc._id },
                    {
                        $set: {
                            transcription,
                            processedAt: new Date()
                        }
                    }
                );
                console.log(`Processed image: ${doc.objectKey}`);
            } catch (error) {
                console.error(`Error processing ${doc.objectKey}:`, error);
            }
        }
    } finally {
        await client.close();
    }
}

// Run image processing every minute
setInterval(processNewImages, 60000);

// MongoDB connection URL
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'memory_db';

app.use(cors());
app.use(express.json());

// MongoDB connection function
async function connectToMongo() {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    return client;
}

app.post('/save-minio-key', async (req, res) => {
    let client;
    try {
        client = await connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection('minio_bucket');

        const { objectKey, timestamp } = req.body;
        const result = await collection.insertOne({
            objectKey,
            timestamp,
            createdAt: new Date()
        });

        res.json({
            success: true,
            id: result.insertedId,
            objectKey
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Route to get transcribed images
app.get('/transcribed-images', async (req, res) => {
    let client;
    try {
        client = await connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection('minio_bucket');
        
        const images = await collection.find({
            transcription: { $exists: true }
        }).toArray();
        
        res.json({
            success: true,
            images: images
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Route to remove all transcriptions
app.post('/remove-all-transcriptions', async (req, res) => {
    let client;
    try {
        client = await connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection('minio_bucket');
        
        const result = await collection.updateMany(
            { transcription: { $exists: true } },
            {
                $unset: { transcription: "" },
                $set: { transcriptionRemovedAt: new Date() }
            }
        );
        
        res.json({
            success: true,
            modifiedCount: result.modifiedCount,
            message: `Removed transcriptions from ${result.modifiedCount} documents`
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Route to serve the transcription viewer page
app.get('/viewer', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'transcriptions.html'));
});

// Route to serve the whiteboard page
app.get('/whiteboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'whiteboard.html'));
});

// Catch-all route for client-side routing
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/dist/') || req.path.startsWith('/icons/')) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'dist', req.path));
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Processing new images every minute...');
    console.log(`Transcription viewer available at http://localhost:${port}/viewer`);
    console.log(`Whiteboard available at http://localhost:${port}/whiteboard`);
});