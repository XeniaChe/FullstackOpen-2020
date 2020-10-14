require('dotenv').config();
const mongoUrl = process.env.MONGODB_URL;
const port = process.env.PORT;

module.exports = { mongoUrl, port };
