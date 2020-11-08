const express = require('express');
const router = express.Router();
const userRouter = require('./userService');
const authRouter = require('../controller/tokenController');
const validateUser = require('../middleware/validateUser');

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
});

// app.use('/product/', validateUser, product_route);

router.use('/user', userRouter);

// router.use(userRouter);
// router.use(authRouter);

module.exports = router;