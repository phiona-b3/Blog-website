const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const postsRouter = require('./routes/posts');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())

app.use('/posts', postsRouter)

const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });

module.exports = app;