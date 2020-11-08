const token_controller = require('../controller/tokenController');


function getToken(header) {
    try {
        return header.authorization.split(' ')[1];
    } catch (e) {
        return false;
    }
}

function sendUnauthenticatedResponse(res) {
    res.sendStatus(401);
}


module.exports = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }
    const token = req.headers.authorization.split('Bearer ')[1];

    console.log('t', token);

    try {
        let token_resp =   token_controller.verify(token);
        console.log('token_resp', token_resp);
    if (token_resp.isVerified) {
        let user_info = await token_controller.getUser(token_resp.decoded.id);
        if (user_info) {
            req.body = {...req.body, user_info};
            next();
        } else {
            sendUnauthenticatedResponse(res);
        }
    } else {
        sendUnauthenticatedResponse(res);
    }
    } catch (e) {
        res.status(403).json({
            status: false,
            error: true,
            message: 'Invalid Token',
            original: e
        });
    }
};


