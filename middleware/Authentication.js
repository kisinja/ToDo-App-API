const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) { return res.status(401).send({ message: "Access denied no token provided" }) } else {
        try {
            const decoded = jwt.verify(token, "elvis");
            // Do not return the user as the next() function does this for us
            req.user = decoded.user;
            next();
        } catch (error) {
            console.log(error.message);
            return res.status(401).send({ message: "Invalid token" });
        }
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).send("You are not allowed to do that :(");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            res.status(403).send("You are not allowed to do that :(");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
}