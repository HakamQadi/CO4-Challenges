const User = require('../models/userModel')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')


const signToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR)
}

exports.getAllUsersByRole = async (req, res) => {
    const role = req.body.role
    try {

        // if the clinet is super admin
        if (role === "super admin") {
            const users = await User.find({ role: { $in: ['admin', 'user'] } })

            res.status(200).json({
                length: users.length,
                data: {
                    users
                }
            })
        }

        // if the clinet is admin
        else if (role === "admin") {
            const users = await User.find({ role: 'user' })

            res.status(200).json({
                length: users.length,
                data: {
                    users
                }
            })
        }

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
        if ((secret_key === process.env.S_SECRET_KEY && role === "super admin") || (secret_key === process.env.A_SECRET_KEY && role === "admin") || role === "user" || role === "") {
            // if(role === ""){
            //     role='user'
            // }
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
        // else if (role === "") {
        //     res.status(401).json({
        //         message: "Choosing role is required"
        //     })
        // }
        else {
            res.status(401).json({
                message: "Wrong secret key"
            })
        }



    } catch (error) {
        res.status(500).json({ error: "Cannot register the user" })
    }
}


exports.deleteUser = async (req, res) => {
    const id = req.params.id
    // console.log(id)
    await User.deleteOne({ _id: id })
    const userExist = await User.find()

    res.status(200)
        .json({
            userExist
        })
    // res.status(200).json({ message: "done" })

}

exports.updateUser = async (req, res) => {
    // const id = req.params.id
    const id = req.body.id
    const newUsername = req.body.username


    await User.updateOne({ _id: id }, { $set: { username: newUsername } })



}

