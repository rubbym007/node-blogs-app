const express = require('express');
const usersController = require('./../controllers/usersController')

const router = express.Router();

router.route('/register').post(usersController.register)
router.route('/login').post(usersController.login)

module.exports = router;