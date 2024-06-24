const myMongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/Ecommerce";
const connectToMongo = async () => {
    try {
        await myMongoose.connect(mongoURL);
        console.log('Connected to MongoDB');

    } catch (e) {
        console.error("Erroe Connecting to MongoDB", e.message);
    }
}
module.exports = connectToMongo;
