const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      maxlength: 50,
      minlength: 3,
    },
    ingredients: {
      type: String,
      required: [true, 'Please provide ingredients'],
      maxlength: 500,
      minlength: 3,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 500,
      minlength: 3,
    },
    image: {
      data: Buffer,
      contentType: String
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },

    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },

  },
  { timestamps: true, }
)

module.exports = mongoose.model('Recipe', RecipeSchema)
