const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 4,
        max: 30,
        unique: false,
    },
    description: {
        type: String,
        require: true,
    },
    category:{
        type: String,
    },
    subCategory:{
        type: String,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    image:{
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);
