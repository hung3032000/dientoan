const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('dotenv').config()
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/',require('./router'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/sign-up', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/create', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const PORT = process.env.PORT_BE || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));