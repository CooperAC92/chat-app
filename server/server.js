const express = require('express');

const path = require('path');

var app = express();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(`server up on ${port}`);

//use index.html page
app.use(express.static(publicPath));

app.listen(port);