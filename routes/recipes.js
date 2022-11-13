const express = require('express')

const router = express.Router()
const {
  getAllRecipes,
  getSingleRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require('../controllers/recipes')

router.route('/').get(getAllRecipes).post(addRecipe)
router.route('/:id').get(getSingleRecipe).delete(deleteRecipe).patch(editRecipe)

module.exports = router
