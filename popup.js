console.log('Popup script loaded');

// Check AWS SDK loading status
function checkAWSLoaded(maxAttempts = 10) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const check = () => {
            attempts++;
            console.log(`Checking AWS SDK (attempt ${attempts}/${maxAttempts})`);
            
            if (typeof AWS !== 'undefined') {
                console.log('AWS SDK loaded successfully');
                resolve(true);
            } else if (attempts >= maxAttempts) {
                console.error('AWS SDK failed to load after maximum attempts');
                reject(new Error('AWS SDK failed to load'));
            } else {
                setTimeout(check, 500); // Check every 500ms
            }
        };
        check();
    });
}

function initializeAWS() {
    try {
        AWS.config.update({
            endpoint: 'http://localhost:9000',
            accessKeyId: 'admin',
            secretAccessKey: 'my-secret-pw',
            s3ForcePathStyle: true,
            signatureVersion: 'v4'
        });
        console.log('AWS configured successfully');
        return new AWS.S3();
    } catch (error) {
        console.error('AWS initialization error:', error);
        document.getElementById('status').textContent = 'Error: AWS initialization failed';
        return false;
    }
}

async function uploadToMinio(file) {
    const timestamp = new Date().toISOString();
    const key = `screenshot-${timestamp}.png`;
    
    const params = {
        Bucket: 'my-bucket',
        Key: key,
        Body: file,
        ContentType: 'image/png'
    };

    try {
        await s3.upload(params).promise();
        console.log('Screenshot uploaded to MinIO:', key);
        return key; // Return the key for MongoDB storage
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

async function saveToMongoDB(objectKey) {
    try {
        const response = await fetch('http://localhost:3002/save-minio-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                objectKey: objectKey,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save to MongoDB');
        }

        const result = await response.json();
        console.log('Saved to MongoDB:', result);
        return result;
    } catch (error) {
        console.error('MongoDB save error:', error);
        throw error;
    }
}

let s3;

function initializeButton() {
    console.log('Initializing button');
    const button = document.getElementById('captureBtn');
    if (!button) {
        console.error('Button not found');
        return;
    }
    
    console.log('Button element found:', button);
    
    button.addEventListener('click', async () => {
        console.log('Button clicked');
        button.disabled = true;
        document.getElementById('status').textContent = 'Capturing screenshot...';
        
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            console.log('Active tab found:', tab.id);
            
            const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
            console.log('Screenshot captured');
            
            document.getElementById('preview').src = screenshot;
            document.getElementById('status').textContent = 'Uploading screenshot...';
            
            const response = await fetch(screenshot);
            const blob = await response.blob();
            const objectKey = await uploadToMinio(blob);
            
            document.getElementById('status').textContent = 'Saving to database...';
            await saveToMongoDB(objectKey);
            
            document.getElementById('status').textContent = 'Screenshot uploaded and saved successfully!';
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('status').textContent = 'Error: ' + error.message;
        } finally {
            button.disabled = false;
        }
    });
}

// Initialize when the window loads
window.addEventListener('load', async () => {
    console.log('Window loaded, checking AWS SDK...');
    document.getElementById('status').textContent = 'Initializing...';
    
    try {
        await checkAWSLoaded();
        s3 = initializeAWS();
        if (s3) {
            console.log('AWS S3 initialized successfully');
            document.getElementById('status').textContent = 'Ready';
            initializeButton();
        } else {
            throw new Error('Failed to initialize AWS S3');
        }
    } catch (error) {
        console.error('Initialization error:', error);
        document.getElementById('status').textContent = 'Error: ' + error.message;
        document.getElementById('captureBtn').disabled = true;
    }
});
