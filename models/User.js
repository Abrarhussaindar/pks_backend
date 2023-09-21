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
    password:{
        type: String,
        require: true,
        min: 8,
    },
    profilePicture:{
        type: String,
        default: "",
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
