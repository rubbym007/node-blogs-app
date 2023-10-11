const express = require('express');
const blogsController = require('./../controllers/blogsController')

const router = express.Router();

// This middleware will be executed only fo rrequests with param id
// router.param('id', moviesController.checkId);

router.route('/')
    .get(blogsController.getAllBlogs)
    .post(blogsController.createBlogs)

router.route('/:id')
    .get(blogsController.getBlog)
    .patch(blogsController.updateBlog)
    .delete(blogsController.deleteBlog)

module.exports = router;