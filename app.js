const express = require("express");
var cors = require('cors')
const app = express();
const mongoose = require("mongoose");

const apiRouter = require("./app/routers/Router");

app.use(cors())

// enable post data
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use("/api", apiRouter);

const PORT = 3040;
const MONGO_DB_URI = "mongodb://127.0.0.1:27017/doughnut_chart";
mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("db connected successfully");
    app.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
