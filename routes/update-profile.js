const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  // console.log(req.body);

  try {
    const updatedProfile = await User.findOneAndUpdate(
      { email: req.user.email }, // Find the user by email
      { name: req.body.name, studying: req.body.studying, phoneno: req.body.phoneno, address: req.body.address }, // Update these fields
      { new: true, useFindAndModify: false } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Updated profile:', updatedProfile);
    res.redirect('/edit');
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});
module.exports = router;