require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const AWS = require('aws-sdk');
const { OpenAI } = require('openai');

const app = express();
const port = 3002;

// Initialize AWS S3 (MinIO)
const s3 = new AWS.S3({
    endpoint: 'http://localhost:9000',
    accessKeyId: 'admin',
    secretAccessKey: 'my-secret-pw',
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
});

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Function to get image from MinIO
async function getImageFromMinIO(objectKey) {
    const params = {
        Bucket: 'my-bucket',
        Key: objectKey
    };
    const data = await s3.getObject(params).promise();
    return data.Body;
}

// Function to transcribe image using OpenAI
async function transcribeImage(imageBuffer) {
    try {
        // Convert the image buffer to a base64-encoded string
        const base64Image = imageBuffer.toString('base64');

        // Create the message content with the base64-encoded image
        const messages = [
            {
                role: "user",
                content: [
                    { type: "text", text: "transcribe." },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/png;base64,${base64Image}`,
                            detail: "low"
                        }
                    }
                ]
            }
        ];

        // Send the request to the OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: messages,
            store: true
        });

        // Return the transcribed text
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
        
        // Get all unprocessed images
        const unprocessed = await collection.find({
            transcription: { $exists: false }
        }).toArray();

        for (const doc of unprocessed) {
            try {
                console.log(`Processing image: ${doc.objectKey}`);
                const imageBuffer = await getImageFromMinIO(doc.objectKey);
                const transcription = await transcribeImage(imageBuffer);
                
                // Update MongoDB with transcription
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
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'memory_db';

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Processing new images every minute...');
});