const User = require('../models/userModel')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')

const app = express()
app.use(cors())

const signToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR)
}



exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({
            length: users.length,
            data: {
                users
            }
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}



exports.profile = async (req, res) => {
    try {
        // const user = await User.find({ _id: req.params.id })
        const user = await User.findById(req.params.id)
        res.status(200).json({
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
exports.createUser = async (req, res) => {
    // Way #1

    // const testUser= new User({})
    // testUser.save()

    // Way #2

    const { username, email, password, secret_key, role } = req.body;
    try {
        if ((secret_key === process.env.S_SECRET_KEY && role === "super admin") || (secret_key === process.env.A_SECRET_KEY && role === "admin") || role === "user") {
            const userExist = await User.findOne({ email }).catch((err) => {
                console.log("Error: ", err)
            })
            if (userExist) {
                return res.status(409).json({ message: "User with email already exists!" }) //409=Conflict9
            }

            const hashPass = bcrypt.hashSync(req.body.password, 12)
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashPass,
                role: req.body.role,
            })
            const token = signToken(newUser._id)
            // console.log("first ", hashPass)
            res.status(201).json({
                token,
                data: {
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                },
                message: "Thanks for registration"
            })
        }
        else if (role === "") {
            res.status(401).json({
                message: "Choosing role is required"
            })
        }
        else {
            res.status(401).json({
                message: "Wrong secret key"
            })
        }



    } catch (error) {
        res.status(500).json({ error: "Cannot register the user" })
    }
}



exports.getUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            const isMatch = await userExist.comparePass(password, userExist.password)
            if (isMatch) {
                // console.log(userExist._id)
                const token = signToken(userExist._id)
                // console.log(token)
                return res.status(201).json({
                    token,
                    username: userExist.username,
                    userRole: userExist.role,
                    userId: userExist._id

                });
            }
            else {
                return res.status(404).json({ message: "Email or password is wrong" }) //404=not found
            }
        }
        else {
            return res.status(404).json({ message: "Email or password is wrong" }) //404=not found
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}





exports.protect = async (req, res, next) => {
    try {
        // check the token
        const testToken = req.headers.authorization
        let token
        if (testToken && testToken.startsWith('bearer')) {
            token = testToken.split(' ')[1]

        }
        if (!token) {
            res.status(401).json({ error: 'You are not logged in!' })
        }

        // validate the token
       await util.promisify(jwt.verify)(token, process.env.SECRET_STR)
        // console.log(decoded)

        // check if user exist
        // const user = await User.findById(decoded.id)
        // if (!user) {
        //     res.status(404).json({ error: "user does not exist anymore!" })
        // }

        // allow user to access

        // req.user = user


        next()
    } catch (error) {
        // console.log(error)
        res.status(400).json({ error: "Invalid Token" })

    }



    // try {
    //     // check the token
    //     const testToken = req.headers.authorization;
    //     let token;
    //     if (testToken && testToken.startsWith('Bearer')) {
    //       token = testToken.split(' ')[1];
    //     }
    //     if (!token) {
    //       return res.status(401).json({ error: 'You are not logged in!' });
    //     }
    
    //     // validate the token
    //     const decoded = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    
    //     // check if user exists and attach it to the req.user object
    //     const user = await User.findById(decoded.id);
    //     if (!user) {
    //       return res.status(404).json({ error: 'User does not exist anymore!' });
    //     }
    
    //     // allow user to access and attach the user object to req.user
    //     req.user = user;
    
    //     // Continue to the next middleware or route handler
    //     next();
    //   } catch (error) {
    //     res.status(400).json({ error: 'Invalid Token' });
    //   }
}