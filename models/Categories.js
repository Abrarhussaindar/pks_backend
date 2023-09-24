const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    subCategories: [
        {
            type: String
        }
    ]
},
    {timestamps: true}
);

module.exports = mongoose.model("Category", CategorySchema)