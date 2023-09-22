const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 4,
        max: 30,
        unique: false,
    },
    username: {
        type: String,
        require: true,
        min: 4,
        max: 25,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    phone: {
        type: String,
        require: true,
        max: 10
    },
    password:{
        type: String,
        require: true,
        min: 8,
    },
    profilePicture:{
        type: String,
        default: "",
    },
    role:{
        type: String,
        default: "user"
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    address:{
        type: Object,
        default: ""
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
