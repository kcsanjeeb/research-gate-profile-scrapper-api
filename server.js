const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.get('/api', (req, res) => {
    const name = req.query.name;
    const process = spawn('python', ['flask_app.py', name]);

    process.stdout.on('data', data => {
        res.json(JSON.parse(data.toString()));
    });

    process.stderr.on('data', data => {
        console.error(data.toString());
        res.status(500).send('Internal Server Error');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
