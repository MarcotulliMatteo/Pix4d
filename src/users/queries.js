const getUsers = 'SELECT * FROM users';
const insertUser = 'INSERT INTO users (name, surname, team) VALUES ($1, $2, $3) RETURNING *';

module.exports = {
    getUsers,
    insertUser
}