const pool = require('../../db');
const queries = require('./queries');

const getCameras = (req, res) => {
    pool.query(queries.getCameras, (error, results) => {
        if(error) return res.status(500).send(error.detail ? error.detail : error);
        res.status(200).json(results.rows);
    })
}

const getCameraByID = (req, res) => {
    const model = req.params.model;
    pool.query(queries.getCameraByID, [model], (error, results) => {
        if(error) return res.status(500).send(error.detail ? error.detail : error);
        res.status(200).json(results.rows);
    })
}

const insertCamera = (req, res) => {
    if(!req.body.data) return res.status(400).send('Specify Data Property in Body');
    const {model, megapixel, brand} = req.body.data;
    pool.query(queries.insertCamera, [model, megapixel, brand], (error, results) => {
        if(error) return res.status(500).send(error.detail ? error.detail : error);
        res.status(201).json(results.rows);
    })
}

const checkCamera = (req, res, next) => {
    if(!req.body.data) return res.status(400).send('Specify Data Property in Body');
    const {cameraModel, cameraMegapixel, cameraBrand} = req.body.data;
    if(!cameraModel) return res.status(400).send('Specify Camera Model');

    pool.query(queries.getCameraByID, [cameraModel], (error, results) => {
        if(results.rows.length) {
            next();
        } else {
            pool.query(queries.insertCamera, [cameraModel, cameraMegapixel, cameraBrand], (error, results) => {
                if(error) return res.status(500).send(error);
                next();
            })
        }
    })
}

module.exports = {
    getCameras,
    insertCamera,
    getCameraByID,
    checkCamera
}