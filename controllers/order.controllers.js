const express = require('express');
const Order = require('../models/Order');

const addOrder = async (req, res) =>{
    const newOrder =  new Order(req.body)
    console.log("new order: ", newOrder)
    try{
        console.log("saved order: ", newOrder)
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    }catch(err){
        res.status(500).json("not allowed to create order")
    }
}

const updateOrder = async (req, res) =>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json("not allowed to update the order")
    }
}

const deleteOrder = async (req, res) =>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("order has been deleted")
    }catch(err){
        res.status(500).json("not allowed to delete the order")
    }
}

const getOrder = async (req, res)=>{
    try{
        const order = await Order.find({userId: req.params.userId});
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllOrders = async (req, res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = { addOrder, getOrder, getAllOrders, deleteOrder, updateOrder }