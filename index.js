const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routers/router')
const db = require('./db')

app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
}));

app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '50mb',
}));

app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("API Gateway")
})

app.use(router)

console.log("API Gateway run on localhost:3000")

app.listen(3000);
