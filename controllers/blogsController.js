const Blog = require('./../models/blogModel')
const ApiFeatures = require('./../utils/apiFeatures');

// Route handler functions

exports.getAllBlogs = async (req,res) => {
    try{
        const features = new ApiFeatures(Blog.find(), req.query)
                                .filter()
                                .sort()
                                .limitFields()
                                .paginate();

        let blogs = await features.query;

        res.status(200).json({
            status: "success",
            length: blogs.length,
            data: {
                blogs
            }
        })
    }catch(err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.createBlogs = async (req,res)=> {
    try{
        const blog = await Blog.create(req.body)

        res.status(201).json({
            status: "success",
            data: {
                blog
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.getBlog = async (req,res) => {

    try{
        const blog = await Blog.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                blog
            }
        })
    }catch(err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.updateBlog = async (req,res) => {

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.status(200).json({
            status: "success",
            data: {
                blog: updatedBlog
            }
        })
    }catch(err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.deleteBlog = async (req,res) => {

    try{
        await Blog.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: "success",
            data: null
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}