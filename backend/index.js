const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const moviesRouter = require("./routes/movies.routes");
var cookieParser = require('cookie-parser')
const cors = require("cors")

const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRouter);
app.use("/api/movies", moviesRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("mongodb server is connected");
  } catch (error) {
    console.log(error);
  }
});
