const express = require("express");
const ConnectToDB = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {errorMiddleware}=require('./middlewares/error')
const config = require("dotenv").config;
config({ path: "./config.env" });

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
  app.use("/api/v1/users", require('./routes/user'));
  app.use("/api/v1/task", require('./routes/task'));
  
  app.use(errorMiddleware);
  
ConnectToDB();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} IN ${process.env.NODE_ENV} Mode`);
});
