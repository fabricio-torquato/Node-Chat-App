const path = require('path');
const http = require('http');
const express = require('express');

const publicPatch = path.join(__dirname, './public');
const port = process.env.PORT || 5000;

var app = express();
var client = http.createServer(app);

app.use(express.static(publicPatch));

client.listen(port, () => {
    console.log('Client is up on port ' + port);
})