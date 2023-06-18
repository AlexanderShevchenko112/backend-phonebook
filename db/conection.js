const mongoose = require("mongoose");
const { DB_URL } = process.env;

const connectServer = async () => {
  await mongoose.connect(DB_URL);
};

module.exports = connectServer;
