const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

// auth controllers

const registerUser = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }

}


const Login = async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(404).json(`${req.body.username}, User not found!`);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json(`${req.body.password}, Wrong password!`);

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
            process.env.JWT_SEC,
            { expiresIn: "1d"}        
        );
        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = { Login, registerUser }