const express = require('express');
const router = express.Router();
const { getuser,adduser,updateuser,deleteuser } = require('../controllers/user.controllers');

router.route('/').get(getuser).post(adduser);
router.route('/:id').put(updateuser).delete(deleteuser);


module.exports = router;
