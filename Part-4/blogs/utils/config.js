require('dotenv').config();

let mongoUrl = process.env.MONGODB_URL;

if (process.env.NODE_ENV === 'test') {
  mongoUrl = process.env.TEST_MONGODB_URL;
}

const port = process.env.PORT;

module.exports = { mongoUrl, port };
