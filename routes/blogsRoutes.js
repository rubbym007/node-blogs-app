const express = require('express');
const blogsController = require('./../controllers/blogsController')
const auth = require("../middleware/auth")

const router = express.Router();

router.route('/')
    .get(auth, blogsController.getAllBlogs)
    .post(auth, blogsController.createBlogs)

router.route('/:id')
    .get(auth, blogsController.getBlog)
    .patch(auth, blogsController.updateBlog)
    .delete(auth, blogsController.deleteBlog)

module.exports = router;