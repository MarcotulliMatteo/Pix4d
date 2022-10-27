const { Router } = require('express');
const router = Router();

const controller = require('./controller');

router.get('/', controller.getUsers);

router.post('/', controller.insertUser);

module.exports = router;