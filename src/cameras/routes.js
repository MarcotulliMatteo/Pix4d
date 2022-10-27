const { Router } = require('express');
const router = Router();

const controller = require('./controller');

const authUserSupportCreation = require('../../auth');

router.get('/', controller.getCameras);

router.get('/:model', controller.getCameraByID);

router.post('/', authUserSupportCreation, controller.insertCamera);

module.exports = router;