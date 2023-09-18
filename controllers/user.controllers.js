const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// user controllers
const profile = (req, res) => {
    res.json("user: ")
}

const Createuser = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }

}

const Updateuser = async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated!");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can update only your account!");
    }
}


const Getuser = async (req, res) => {

    const _id = req.body.userId;
    // console.log("id", _id)
    try{
        const user = await User.findById(_id) 
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = { profile, Createuser, Updateuser, Getuser }