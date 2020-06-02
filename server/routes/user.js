const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId });
        let userResponse = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.patch('/', [
    check('oldPassword', 'Old password must contain more than 6 symbols').isLength({ min: 6 }),
    check('newPassword1', 'New password1 must contain more than 6 symbols').isLength({ min: 6 }),
    check('newPassword2', 'New password2 must contain more than 6 symbols').isLength({ min: 6 })
], async (req, res) => {
    try {
        let { oldPassword, newPassword1, newPassword2 } = req.body;

        const user = await User.findOne({ _id: req.user.userId });
        // userOldPassword = await bcrypt.hash(oldPassword, 12);
        // console.log(userOldPassword);
        // console.log(user.password);
        // if (userOldPassword !== user.password) {
        //     return res.status(401).json({
        //         message: 'Old password isn\'t matched'
        //     })
        // }

        console.log(newPassword1);
        console.log(newPassword2);
        if (newPassword1 != newPassword2) {
            return res.status(401).json({
                message: 'New password is not equal in both fields'
            })
        }

        user.password = await bcrypt.hash(newPassword1, 12);
        await user.save();

        res.status(201).json({ message: "User password has been updated" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;