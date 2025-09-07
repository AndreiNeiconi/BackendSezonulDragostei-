// //Declaration

// const express = require("express");
// const app = express();
// const PORT = 8080;

// //Set the engie

// app.set("view engine", "ejs");

// // GET Request

// app.get("/", (req, res) => {
//   res.render("index");
// });

// // import user router

// const userRouter = require('./routes/subscriebe')

// //
// app.use('/users',userRouter)

// //Runinig the server on port 8080
// app.listen(PORT, () =>
//   console.log(`SServer is listning on http://localhost:8080`)
// );

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

//Midlleware

app.use(cors());
app.use(bodyParser.json());

//Path to json file
const dataFile = path.join(__dirname, "./db/db.json");

// helper:Read exiting data

function readData() {
  try {
    const raw = fs.readFileSync(dataFile);
    return JSON.parse(raw);
  } catch (err) {
    return [];
    console.log(err);
  }
}

// help with same the data
function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

app.post("/", (req, res) => {
  const formData = req.body;
  console.log("recived data from user");

  const data = readData();

  data.push({
    ...formData,
    timestamp: new Date().toISOString(),
  });

  saveData(data);

  res.json({ messge: "form recived succesfuly", data: formData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
