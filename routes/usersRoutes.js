const express = require('express');
const usersController = require('./../controllers/usersController')

const router = express.Router();

router.route('/register').get(usersController.register)
router.route('/login').get(usersController.login)

module.exports = router;