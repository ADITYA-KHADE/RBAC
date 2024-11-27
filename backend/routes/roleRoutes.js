const express = require('express');
const router = express.Router();
const { getroles,updaterole,deleterole,addrole } = require('../controllers/role.controllers');

router.route('/').get(getroles).post(addrole);
router.route('/:id').put(updaterole).delete(deleterole);

module.exports = router;
