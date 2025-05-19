const express = require('express');

const router = express.Router();
router.post('/register', () => {
  console.log('in post');
});
router.post('/logout', () => {
  console.log('logout');
});
module.exports = router;
