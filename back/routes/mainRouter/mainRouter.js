const express = require('express');
const User = require('../../models/User/User');

const router = express.Router();
/* GET home page. */
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (e) {
    console.log(e)
  }
});

router.get('/api/users/:name', async (req, res) => {
  try {
    const users = await User.find();
    const filteredUsers = users.filter(user => user.name.toLowerCase().indexOf(req.params.name) === 0)
    res.json({ users: filteredUsers });
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;