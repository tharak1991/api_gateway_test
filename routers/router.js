const express = require('express');
const router = express.Router();
const userRouter = require('./userRoute');


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
});

router.use('/user', userRouter);

module.exports = router;