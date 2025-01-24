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
- MongoDB instance
- AWS account and credentials
- OpenAI API key
- Chrome browser

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

3. Create a `.env` file in the root directory with your configuration:
   ```
   MONGODB_URI=your_mongodb_uri
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   OPENAI_API_KEY=your_openai_api_key
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
- `server.js` - Backend Express server
- `background.js` - Chrome extension background script
- `popup.js` - Extension popup script
- `manifest.json` - Extension configuration

## License

[Add your license information here]

## Contributing

[Add contribution guidelines here]