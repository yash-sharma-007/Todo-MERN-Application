const express = require("express");
const ConnectToDB = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("dotenv").config;
config({ path: "./config.env" });

const app = express();

ConnectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser())
app.use("/api/v1/users", require('./routes/user'));
app.use("/api/v1/task", require('./routes/task'));

app.use((err,req,res,next)=>{
  err.message=err.message || "Internal Error";
  res.status(500).json({
    success:false,
    message:err.message,
}); 
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} IN ${process.env.NODE_ENV} Mode`);
});
