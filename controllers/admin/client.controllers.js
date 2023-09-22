const express = require('express');
const User = require('../../models/User');

// admin controllers
const Dashboard = async (req, res) => {
    const _id = req.body.userId;
    
    try{
        const user = await User.findById(_id);
        if(user.isAdmin){
            res.status(200).json(user);
        }else{
            res.status(403).json("You are not allowed to see this!")
        }

    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = { Dashboard }