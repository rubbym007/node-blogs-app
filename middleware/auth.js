const jwt = require("jsonwebtoken");

const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const verifyToken = (req, res, next) => {
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({
                status: "fail",
                message: "A token is required for authentication"
            });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
                status: "fail",
                message: "Invalid Token"
            });
    }
    return next();
};

module.exports = verifyToken;