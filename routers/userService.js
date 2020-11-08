var express = require('express');
var router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../config');
const apiAdapter = require('./apiAdapter');
const validateUser = require('../middleware/validateUser');

const BASE_URL = 'http://localhost:3001'
const api = apiAdapter(BASE_URL)

router.post('/', async (req, res) => {
  try {
    const path = req.path;
    const apiURl = BASE_URL + '/user' + path;
    console.log('apiURl', apiURl);

    let resp = await axios.post(apiURl, req.body);

    if( resp.data.status){      
      const token = jwt.sign({ id: resp.data.user_id }, config.secret, { expiresIn: config.expiry });
      await res.status(201).json({
        status: true,
        jwt: {
          token: token,
          expiry: config.expiry
        }
      });
    }

   
  } catch (error) {
    console.error(error);
  }
})

router.get('/:id' , validateUser,  async (req, res) => {
  try {
    const path = req.path;
    const apiURl = BASE_URL + '/user' + path;

    let resp = await axios.get(apiURl, req.body);

    await res.status(201).json({
      status: true,
      user: resp.data
    });
  } catch (error) {
    console.error(error);
  }
})

router.get('/all', validateUser, async(req, res) => {
  try {
    const path = req.path;
    const apiURl = BASE_URL + path;

    let resp = await axios.get(apiURl, req.body);

    await res.status(201).json({
      status: true,
      user: resp.data
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router