const jwt = require('jsonwebtoken');
const config = require('../config');
const { user_model } = require('../model/user');

exports.verify = token => {
    try {
        jwt.verify(token, config.secret);
        return true;
    } catch (e) {
        return false;
    }
};

exports.getUser = async token => {
    try {
        let decoded = jwt.verify(token, config.secret);
        console.log('decoded token', decoded);
        let data = await user_model.findById(decoded.data);
        delete data.password;
        return data;
    } catch (e) {
        return false;
    }
};
