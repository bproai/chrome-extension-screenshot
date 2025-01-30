# Chrome Extension Screenshot

A Chrome extension that enables users to capture screenshots with advanced features including cloud storage and AI-powered transcription capabilities. The extension uses a React-based UI with modern web technologies for a seamless user experience.

## Features

- Screenshot capture functionality
- Cloud storage integration with AWS
- MongoDB database for data persistence
- OpenAI integration for intelligent text processing
- React-based user interface
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend:**
  - React
  - Tailwind CSS
  - Webpack
  - Chrome Extension APIs

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - AWS SDK

- **APIs:**
  - OpenAI API
  - AWS Services

## Prerequisites

- Node.js (Latest LTS version recommended)
- Docker (recommended for local development)
- MongoDB instance (or Docker)
- AWS account and credentials (or MinIO via Docker)
- OpenAI API key
- Chrome browser

## API Endpoints

### Screenshot Management

- `POST /save-minio-key` - Save a new screenshot reference to MongoDB
- `GET /transcribed-images` - Retrieve all transcribed images
- `GET /viewer` - Access the transcription viewer interface

### Transcription Management

- `POST /remove-all-transcriptions` - Remove all transcriptions from the database
  - **⚠️ CAUTION:** This is a destructive operation that removes all transcribed text from the MongoDB database
  - The original images in MinIO/S3 remain untouched
  - Use this endpoint with extreme caution as it cannot be undone
  - Example usage:
    ```bash
    curl -X POST http://localhost:3002/remove-all-transcriptions
    ```

## Database and Storage Setup

### MongoDB Setup

For local development, Docker is recommended for a clean and isolated setup:

```bash
# Pull and run MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

Alternatively, you can:
1. Install MongoDB locally or create a MongoDB Atlas account
2. Create a new database for the project (default: memory_db)
3. Create the following collections:
   - `minio_bucket` - Stores screenshot metadata and transcriptions
4. Get your MongoDB connection URI:
   - For local MongoDB: `mongodb://localhost:27017/memory_db`
   - For MongoDB Atlas: Get the connection string from your cluster settings

### MinIO/S3 Bucket Setup

1. Set up MinIO locally or use AWS S3:
   - For MinIO using Docker (recommended):
     ```bash
     # Pull and run MinIO container
     docker run -d \
       --name minio \
       -p 9000:9000 \
       -p 9001:9001 \
       -e "MINIO_ROOT_USER=your_minio_user" \
       -e "MINIO_ROOT_PASSWORD=your_minio_password" \
       quay.io/minio/minio server /data --console-address ":9001"
     ```
   - Alternative local installation:
     ```bash
     # Install MinIO (macOS example)
     brew install minio/stable/minio
     
     # Start MinIO server
     minio server /path/to/data
     ```
   - Access MinIO console (default: http://localhost:9001)

2. Create a new bucket:
   - Name it `my-bucket` (default) or your preferred name
   - Set bucket policy to allow read/write access
   - Configure CORS policy for your domain

3. Get your credentials:
   - For MinIO: Configure your access key and secret key in the MinIO console
   - For AWS S3: Create IAM user with S3 access and get credentials

4. Required bucket policy (adjust as needed):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": "*",
         "Action": ["s3:GetObject", "s3:PutObject"],
         "Resource": ["arn:aws:s3:::your-bucket-name/*"]
       }
     ]
   }
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd chrome-extension-screenshot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory using the provided `.env.sample` as a template:
   ```
   # OpenAI API Key for image transcription
   OPENAI_API_KEY=your_openai_api_key_here

   # MongoDB Configuration (optional - defaults shown)
   MONGODB_URL=mongodb://localhost:27017
   MONGODB_DB_NAME=memory_db

   # MinIO Configuration (optional - defaults shown)
   MINIO_ENDPOINT=http://localhost:9000
   MINIO_ACCESS_KEY=admin
   MINIO_SECRET_KEY=my-secret-pw
   MINIO_BUCKET_NAME=my-bucket

   # Server Configuration (optional - default shown)
   PORT=3002
   ```

4. Build the extension:
   ```bash
   npm run build
   ```

## Development

- Start the development server:
  ```bash
  npm start
  ```

- Build CSS (watch mode):
  ```bash
  npm run watch:css
  ```

- Build for production:
  ```bash
  npm run build
  ```

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the extension directory
4. The extension icon should appear in your Chrome toolbar

## Project Structure

- `/components` - React components
- `/public` - Static assets and HTML files
- `/src` - Source code and styles
- `/icons` - Extension icons and favicon
- `server.js` - Backend Express server
- `background.js` - Chrome extension background script
- `popup.js` - Extension popup script
- `manifest.json` - Extension configuration

## License

[Add your license information here]

## Contributing

[Add contribution guidelines here]