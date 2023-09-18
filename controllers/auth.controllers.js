const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// auth controllers
const Login = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json(`${req.body.email}, User not found!`);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json(`${req.body.password}, Wrong password!`);

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = { Login }