const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        console.log("Auth Header:", req.headers.authorization);

        const token = req.headers.authorization.split(" ")[1];
        console.log("Extracted Token:", token);
        console.log("JWT Secret:", process.env.JWT_SECRET);
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified Token:", verifiedToken);

        req.userId = verifiedToken.userId;
        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: "Unauthorized access" });
    }
};

module.exports = auth;