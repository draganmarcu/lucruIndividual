const pool = require('./db');

const getUserByUsernameAndPassword = (username, password) => {
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`; // Vulnerabil la SQLi
    return pool.query(query);
};

const addComment = (userId, comment) => {
    if (!comment) {
        throw new Error('Comment cannot be empty');
    }

    const query = `INSERT INTO comments (comment) VALUES ($1, $2)`;
    return pool.query(query, [comment])
        .then(res => {
            console.log('Comment added successfully');
            return res;
        })
        .catch(err => {
            console.error('Error adding comment:', err);
            throw err;
        });
};

const deleteComment = (id) => {
    return new Promise((resolve, reject) => {
        // Your database delete logic here (e.g., using SQL)
        const query = 'DELETE FROM comments WHERE id = ?';
        pool.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const updateComments = (id, updatedComment) => {
    return new Promise((resolve, reject) => {
        // Your database update logic here, for example using SQL:
        const query = 'UPDATE comments SET comment = ? WHERE id = ?';
        console.log(id, query);
        pool.query(query, [updatedComment, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


const getComments = () => {
    const query = `SELECT * FROM comments`;
    return pool.query(query);
};

module.exports = {
    getUserByUsernameAndPassword,
    addComment,
    getComments,
    updateComments,
    deleteComment
};
