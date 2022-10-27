const getCameras = 'SELECT * FROM cameras';
const getCameraByID = 'SELECT * FROM cameras WHERE model = $1';
const insertCamera = 'INSERT INTO cameras (model, megapixel, brand) VALUES ($1, $2, $3) RETURNING *';

module.exports = {
    getCameras,
    insertCamera,
    getCameraByID
}