// Create web server
// 1. Import express
// 2. Create an instance of express
// 3. Create a route for GET /comments
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id
// 7. Start the server

// 1. Import express
const express = require('express');
const comments = require('./comments');
const app = express();
const bodyParser = require('body-parser');

// 3. Create a route for GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// 4. Create a route for POST /comments
app.use(bodyParser.json());
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    const id = comments.length + 1;
    comments.push({ id, username, comment });
    res.json({ id });
});

// 5. Create a route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const { username, comment } = req.body;
    const index = comments.findIndex(comment => comment.id === parseInt(id));
    comments[index] = { id: parseInt(id), username, comment };
    res.json(comments[index]);
});

// 6. Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(comment => comment.id === parseInt(id));
    comments.splice(index, 1);
    res.json({ id });
});

// 7. Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});