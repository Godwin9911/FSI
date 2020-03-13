const dotenv = require('dotenv');

dotenv.config();

if (process.env.NODE_ENV === 'development') {
  module.exports = {
    PORT: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
  };
}
