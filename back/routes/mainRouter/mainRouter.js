const express = require('express');
const User = require('../../models/User/User');

const router = express.Router();
/* GET home page. */
router.get('/api/users', async (req, res) => {
  try{
    const users = await User.find();
    res.json({ users });
  }catch(e){
    console.log(e)
  }
});

module.exports = router;