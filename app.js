const express = require("express");
const app = express();
require("dotenv").config();
const notFound = require("./middlewares/not-found");

//security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

//Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
//ConnectDB
const connectDB = require("./db/connectDB");
const authenticateUser = require("./middlewares/athentication");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 75,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use(notFound);

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
