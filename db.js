const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/todo3").then(() => console.log("DB CONNECTED!!")).catch((err) => console.log(err.message))
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { connectDb };