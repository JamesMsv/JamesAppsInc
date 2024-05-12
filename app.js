const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
console.log(process.cwd());
const app = express();

// Middleware
app.use(fileUpload());

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    uploadedFile.mv(path.join(__dirname, 'uploads', uploadedFile.name), (err) => {
        if (err) {
            return res.status(500).send(err+' IntenerError 500');
        }

        res.send('File uploaded successfully!');
    });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
