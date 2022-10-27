const pool = require('../../db');
const queries = require('./queries');

const getDrones = (req, res) => {
    const filters = req.query;
    const arrFilters = Object.entries(filters);
    var queryGetDrones = queries.getDrones;

    var orderBy;
    var orderDir;

    arrFilters.forEach((filter, index) => {
        if(filter[0] === queries.SORT_BY.NAME) {
            [orderBy, orderDir] = filter[1].split(queries.SORT_BY.DELIMITER);
        } else {
            queryGetDrones = queries.concatFilter(queryGetDrones, filter[0], filter[1], index);
        }
    })

    if(orderBy !== undefined && orderDir !== undefined) {
        queryGetDrones = queries.orderBy(queryGetDrones, orderBy, orderDir);
    }

    pool.query(queryGetDrones, (error, results) => {
        if(error) return res.status(500).send(error.detail ? error.detail : error);
        res.status(200).json(results.rows);
    })
}

const insertDrone = (req, res) => {
    if(!req.body.data) return res.status(400).send('Specify Data Property in Body');
    const {name, brand, serialNumber, cameraModel} = req.body.data;
    pool.query(queries.insertDrone, [name, brand, serialNumber, cameraModel], (error, results) => {
        if(error) return res.status(500).send(error.detail ? error.detail : error);
        res.status(201).json(results.rows);
    })
}

module.exports = {
    getDrones,
    insertDrone
}