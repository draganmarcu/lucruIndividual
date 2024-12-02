const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUserByUsernameAndPassword, addComment, getComments, updateComments, deleteComment} = require('./queries');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    getUserByUsernameAndPassword(username, password)
        .then(results => {
            if (results.rows.length > 0) {
                res.status(200).json(results.rows);

            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(error => {
            console.error('Error executing query', error.stack);
            res.status(500).send('Error executing query: ' + error.message);
        });
});

app.post('/add-comment', (req, res) => {
    const { comment } = req.body;
    addComment( comment)
        .then(() => res.status(201).send('Comment added'))
        .catch(err => res.status(500).send('Error adding comment: ' + err.message));
});

app.put('/update-comments', (req, res) => {
    const { id, updatedComment } = req.body;  // Get the ID and updated comment from the request body

    // Assume you have a function to update the comment in your database
    updateComments(id, updatedComment)
        .then(() => res.status(200).send('Comment updated'))
        .catch(err => res.status(500).send('Error updating comment: ' + err.message));
});

app.delete('/delete-comments/:id', (req, res) => {
    const { id } = req.params;  // Get the comment ID from the URL parameter

    // Assuming you have a function to delete a comment by ID from your database
    deleteComment(id)
        .then(() => res.status(200).send('Comment deleted'))
        .catch(err => res.status(500).send('Error deleting comment: ' + err.message));
});



app.get('/comments', (req, res) => {
    getComments()
        .then(results => res.status(200).json(results.rows))
        .catch(err => res.status(500).send('Error retrieving comments: ' + err.message));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
