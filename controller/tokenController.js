const jwt = require('jsonwebtoken');
const config = require('../config');
const user_model = require('../model/user');

exports.verify = (token) => {
    try {
        let decoded = jwt.verify(token, config.secret);
        return {
            isVerified: true,
            decoded: decoded
        }
    } catch (e) {
        console.error(e);
        return {
            isVerified: false,
            error: e
        }
    }
};

exports.getUser = async id => {
    try {
        let data = await user_model.findById(id);
        delete data.password;
        return data;
    } catch (e) {
        console.error(e);
        throw new Error('get user failed')
    }
};