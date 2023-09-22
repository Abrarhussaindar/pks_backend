const express = require('express');
const UserAddress = require('../models/UserAddress');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const createAddress = async (req, res) =>{
    try{
        const user = await User.findById(req.body.userId)
        if(user){
            const newUserAddress = new UserAddress({
                userId: req.body.userId,
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode
            });
    
            const address = await newUserAddress.save();
            res.status(201).json(address);
        }else{
            res.status(404).json(`${req.body.userId}: not found.`)
        }
    }catch(err){
        return res.status(500).json(err);
    }
}
const GetUserAddress = async (req, res) => {
    try{
        const userAddress = await UserAddress.find({userId: req.params.id}) 
        // const { password, ...other } = user._doc;
        res.status(200).json(userAddress);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {createAddress, GetUserAddress}