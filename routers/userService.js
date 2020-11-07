var express = require('express');
var router = express.Router();
const axios = require('axios');
const apiAdapter = require('./apiAdapter');
const isAuthorized = require('../controller/requestAuthenticator');

const BASE_URL = 'http://localhost:3001'
const api = apiAdapter(BASE_URL)

router.post('/user/', async (req, res) => {
  try {
    const path = req.path;
    const apiURl = BASE_URL + path;

    let resp = await axios.post(apiURl, req.body);

    await res.status(201).json({
      status: true,
      user: resp.data
    });
  } catch (error) {
    console.error(error);
  }
})

router.get('/user/:id', async (req, res) => {
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
})

router.get('/user/all', isAuthorized, (req, res) => {
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