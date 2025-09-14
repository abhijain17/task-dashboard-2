require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRoute = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/tasks', tasksRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
