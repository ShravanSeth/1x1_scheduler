require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const studentRouter = require("./api/student/student.router");
const mentorRouter = require("./api/mentor/mentor.router");
const connectRouter = require("./api/connection/connect.router");



app.use(cors({
   origin: "http://localhost:3000", 
   credentials: true,
   methods: "GET,POST,PUT,DELETE",
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/student", studentRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/connect", connectRouter);


app.get("/" ,(req,res) =>{
    return res.status(200).json({
        success: true,
        message: "API is running",
      });
})

//404 Request
app.all("*", (req, res) => {
    return res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });


//set app port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function() {
    console.log("It's UP!");
  })