const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const data = JSON.parse(event.body);
    const { fileContent, fileName, section } = data;

    if (!fileContent || !fileName || !section) {
        return {
            statusCode: 400,
            body: 'Missing required fields',
        };
    }

    const uploadDir = path.join(__dirname, '..', 'uploads', section);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    try {
        fs.writeFileSync(filePath, fileContent, 'base64');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully', filePath }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to upload file', error: error.message }),
        };
    }
};