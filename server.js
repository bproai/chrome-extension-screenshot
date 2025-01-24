const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3002;

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});