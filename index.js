const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoHandler = require('./route/todoHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log(err);
  });

app.use("/", todoHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

