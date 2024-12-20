const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/payment', require('./routes/payment'));

module.exports = app;