const express = require("express");
const app = express();
require("dotenv").config();
//Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
//ConnectDB
const connectDB = require("./db/connectDB");
const authenticateUser = require("./middlewares/athentication");

app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

//connectDB
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
