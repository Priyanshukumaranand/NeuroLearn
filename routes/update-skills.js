const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    //  console.log(req.body);
    try {
        const updatedskills = await User.findOneAndUpdate(
            { email: req.user.email }, // Find the user by email
            {
                'skills.skill1': req.body.skill1,
                'skills.skill2': req.body.skill2,
                'skills.skill3': req.body.skill3,
                'skills.skill4': req.body.skill4,
                'skills.skill5': req.body.skill5,
            }, // Update these fields
            { new: true, useFindAndModify: false } // Return the updated document
        );

        if (!updatedskills) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('Updated skills:', updatedskills);
        res.redirect('/edit');
    } catch (error) {
        console.error('Error updating skills:', error);
        res.status(500).json({ error: 'Failed to update skills' });
    }
});
module.exports = router;