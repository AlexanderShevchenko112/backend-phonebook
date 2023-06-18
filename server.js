const app = require("./app");
const connectServer = require("./db/conection");
const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectServer();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
