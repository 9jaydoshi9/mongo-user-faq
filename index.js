const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// version 1 route
app.use("/api/v1", routes);

// Connect to db
mongoose.connect(process?.env?.MongodbUrl).then((res) => {
    // DB connection success, start express app
    console.log("DB connection successful !");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to database");
  });
