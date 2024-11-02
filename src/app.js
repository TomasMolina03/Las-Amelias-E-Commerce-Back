const express = require('express');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

module.exports = app;