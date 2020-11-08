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
    if (!req.headers.Authorization || !req.headers.Authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }
    const token = req.headers.Authorization.split('Bearer ')[1];

    try {
        let isTokenValid = token_controller.verify(getToken(token));
    if (isTokenValid) {
        let user_info = await token_controller.getUser(token);
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


