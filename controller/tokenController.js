const jwt = require('jsonwebtoken');
const config = require('../config');
const user_model = require('../model/user');

exports.verify = (token) => {
    try {
        // console.log(1);
        let decoded = jwt.verify(token, config.secret);
        // console.log(2);
        // return true ;
        return {
            isVerified : true ,
            decoded: decoded
        }
    } catch (e) {
        console.error(e);
        // return false;
        //throw new error('invalid token')
        return {
            isVerified : false ,
            error: e
        }
    }
};

exports.getUser = async id => {
    try {
        // let decoded = jwt.verify(token, config.secret);
        console.log('id', id);
        let data = await user_model.findById(id);
        console.log(data);
        delete data.password;
        return data;
    } catch (e) {
        console.error(e);
        return false;
    }
};
