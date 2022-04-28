const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();

// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);

const port = process.env.PORT;
const config = require("./config");

const postsRouter = require("./routes/Post");

app.use(logger("dev"));

const dbUrl = config.dbUrl;

var options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.connect(dbUrl, options, (err) => {
    if(err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname,'public')));
app.use("/posts", postsRouter);
app.listen(port, () => console.log("Running on " + port));
module.exports = app;