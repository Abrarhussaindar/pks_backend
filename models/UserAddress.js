const mongoose = require('mongoose');

const UserAddressSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true
    },
    state:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        required: true,
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("UserAddress", UserAddressSchema);
