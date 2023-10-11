const User = require('./../models/userModel')

exports.register = async (req,res) => {
    try{

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

exports.login = async (req,res) => {
    try{
        

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