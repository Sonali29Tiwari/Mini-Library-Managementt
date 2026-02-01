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

require("dotenv").config();

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo Connected: ${connectionDb.connection.host}`);
   
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
};
start();
