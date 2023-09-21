const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// user controllers



const Updateuser = async (req, res) => {
    if(req.body.password){
        try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500).json(err);
    }
}


const GetUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id) 
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
}

const DeleteUser = async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.param.id)
        res.status(200).json(`user has been deleted.`)
    }catch(err){
        res.status(500).json(err)
    }
}

const GetAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {  Updateuser, GetUser, DeleteUser, GetAllUsers }