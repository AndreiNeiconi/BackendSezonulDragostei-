//Declaration

const express = require("express");
const app = express();
const PORT = 8080;

//Set the engie

app.set("view engine", "ejs");

// GET Request

app.get("/", (req, res) => {
  res.render("index");
});


// import user router

const userRouter = require('./routes/subscriebe')

//
app.use('/users',userRouter)

//Runinig the server on port 8080
app.listen(PORT, () =>
  console.log(`SServer is listning on http://localhost:8080`)
);
