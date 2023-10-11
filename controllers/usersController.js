const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
const bcrypt = require("bcrypt")
dotenv.config({path: './config.env'})
const User = require('./../models/userModel')

exports.register = async (req,res) => {
    try{
    	const { first_name, last_name, email, password } = req.body;

    	const oldUser = await User.findOne({ email });

	    if (oldUser) {
	      	res.status(409).json({
            	status: "fail",
            	message: "User Already Exist. Please Login"
        	});
	    }

    	encryptedPassword = await bcrypt.hash(password, 10);
    	console.log(encryptedPassword)

    	const user = await User.create({
      		first_name,
      		last_name,
      		email,
      		password: encryptedPassword,
    	});

    	const token = jwt.sign(
      		{ user_id: user._id, email },
      		process.env.TOKEN_KEY,
      		{
        		expiresIn: "2h",
      		}
    	);
    	
    	user.token = token;

        res.status(200).json({
            status: "success",
            data: {
                user
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
        const { email, password } = req.body;

    	if (!(email && password)) {
      		res.status(400).send("All input is required");
    	}
    	
    	const user = await User.findOne({ email });

    	if (user && (await bcrypt.compare(password, user.password))) {
      		
      		const token = jwt.sign(
        		{ user_id: user._id, email },
        		process.env.TOKEN_KEY,
        		{
          			expiresIn: "2h",
        		}
      		);

      		user.token = token;

      		res.status(200).json({
	            status: "success",
	            data: {
	                user
	            }
	        })
    	}

        res.status(400).json({
            status: "fail",
            message: "Invalid Credentials"
        })
    }catch(err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}