const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/mainRouter/mainRouter');

const options = require('./options');
const PORT = process.env.PORT || 4000;


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', mainRouter);

async function start() {
  try {
    await mongoose.connect(options.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();