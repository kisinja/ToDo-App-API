const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const { connectDb } = require('./db');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./middleware/Authentication');
const authRouter = require('./routes/Auth');
const userRouter = require('./routes/Users');
const taskRouter = require('./routes/Tasks');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const PORT = 5060;

const start_server = async () => {
    try {
        connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

start_server();

app.use("/auth", authRouter);
app.use("/users", verifyTokenAndAdmin, userRouter);
app.use("/tasks", verifyTokenAndAdmin, taskRouter);

app.get("/", (req, res) => {
    res.send("Welcome").status(200);
});