const express = require('express');
const router = express.Router();
const controllers = require('../controllers/');

const People = new controllers.People();

// List people like you
router.get('/', async (req, res, next) => {
    let result = await People.List(req);
    res.status(result.status);
    delete result.status;

    res.json(result);
});

module.exports = router;
