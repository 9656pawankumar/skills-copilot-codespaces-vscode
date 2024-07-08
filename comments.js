// Create web server
// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Use body-parser
app.use(bodyParser.json());

// GET
app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }

        res.send(data);
    });
});

// POST
app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }

        let comments = JSON.parse(data);
        comments.push(req.body);

        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                res.status(500).send('Error writing comments.json');
                return;
            }

            res.send('Comment added');
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});