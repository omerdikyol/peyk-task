var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    image:
    {
        data: Buffer,
        contentType: String
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    }
}, { timestamps: true });
module.exports = new mongoose.model('Image', imageSchema);