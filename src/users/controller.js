const pool = require('../../db');
const queries = require('./queries');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if(error) return res.status(500).send(error.detail ? error.detail : error);
        res.status(200).json(results.rows);
    })
}

const insertUser = (req, res) => {
    if(!req.body.data) return res.status(400).send('Specify Data Property in Body');
    const {name, surname, team} = req.body.data;
    if(!name || !surname || !team) return res.status(400).send('Specify name, surname, team Properties in Data Body');
    pool.query(queries.insertUser, [name, surname, team], (error, results) => {
        if(error) return res.status(500).send(error.detail ? error.detail : error);
        res.status(201).json(results.rows);
    })
}

module.exports = {
    getUsers,
    insertUser
}