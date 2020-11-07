const mongoose = require('mongoose');
const config = require('./config');


 mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});