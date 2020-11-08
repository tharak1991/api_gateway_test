const token_controller = require('../controller/tokenController');



function sendUnauthenticatedResponse(res) {
    res.sendStatus(401);
}


module.exports = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }
    const token = req.headers.authorization.split('Bearer ')[1];

    try {
        let token_resp = token_controller.verify(token);

        if (token_resp.isVerified) {
            next();
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