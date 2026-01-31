const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/books", bookRoutes);

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://sonalitiwari2904_db_user:P5mEl86tyWxgAhsE@cluster0.qxw6k7r.mongodb.net/minilibrary"
    );

    console.log(`Mongo Connected: ${connectionDb.connection.host}`);
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  } catch (error) {
    console.log(error);
  }
};
start();
