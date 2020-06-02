const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = Router();
const { check, checkSchema, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

var Schema = {
    "userType": {
        in: 'body',
        matches: {
            options: [/\b(?:driver|shipper)\b/],
            errorMessage: "Invalid user type"
        }
    }
}

/**
* @swagger
* /api/auth/signup:
*    post:
*      summary: "Signup with a new user"
*      description: ""
*      operationId: "createUser"
*      consumes:
*      - "application/json"
*      produces:
*      - "application/json"
*      parameters:
*      - in: "body"
*        name: "body"
*        description: "User that needs to be created"
*        required: true
*        schema:
*          $ref: "#/server/models/User"
*/
router.post('/signup', [
    check('firstName', 'First name must contain more than 3 symbols').isLength({ min: 3 }),
    check('lastName', 'Last name must contain more than 3 symbols').isLength({ min: 3 }),
    check('email', "Invalid  e-mail").isEmail(),
    checkSchema(Schema),
    check('password', 'Password must contain more than 6 symbols').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in signup fields'
            })
        }

        let { firstName, lastName, email, password, userType } = req.body;
        email = email.toLowerCase();

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json('User already exists');
        }

        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.userType = userType;
        newUser.password = await bcrypt.hash(password, 12);
        console.log("newUser: " + JSON.stringify(newUser));

        await newUser.save();

        res.status(201).json({ message: "User was created" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'User wasn\'t created' });
    }
})

/**
* @swagger
* "/api/auth/signin": {
*   "post": {
*       "description": "Signin with existed user",
*       "consumes" : "application/json",
*       "responses": {
*           "201": {
*               "description": "A successful response",
*               "content": {
*                          "schema": {
*                             "$ref": "#/server/models/User"
*                           }
*               }
*           },
*           "400": {
*               "description": "Wrong data in registration fields OR User already exists"
*           }
*       }
*   },
*   "parameters": {
*       "name": "login",
*       "description": "User login",
*       "required": "true"
*   }
*}
*/
router.post('/signin', [
    check('email', 'Email must contain more than 3 symbols').isLength({ min: 7 }),
    check('password', 'Password must contain more than 6 symbols').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data in email fields'
            })
        }

        let { email, password } = req.body;
        email = email.toLowerCase();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "This user doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: user.id, userType: user.userType },
            config.get('jwtSecret'),
            { expiresIn: '2h' }
        )

        res.status(201).json({ token, userId: user.id, userType: user.userType });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.delete('/', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(400).json({ message: "This user doesn't exist" });
        }

        User.findOneAndDelete({ _id: req.user.userId }, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Successful deletion");
        });

        res.status(201).json({ message: "User has been successfully removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;