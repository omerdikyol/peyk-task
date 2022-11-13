const Recipe = require('../models/Recipe')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { decodeUser } = require('../utils/utils')

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort('createdAt')
  res.status(StatusCodes.OK).json({ recipes, count: recipes.length })
}

const getSingleRecipe = async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.id })
  if (!recipe) {
    throw new NotFoundError(`No recipe with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ recipe })
}

const addRecipe = async (req, res) => {
  const recipe = await Recipe.create({ title: req.body.title, ingredients: req.body.ingredients, description: req.body.description, createdBy: req.user._id, updatedBy: req.user._id })
  // console.log(req)
  console.log(recipe);
  res.status(StatusCodes.CREATED).json({ recipe })
}

const editRecipe = async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.id })
  if (!recipe) {
    throw new NotFoundError(`No recipe with id ${req.params.id}`)
  }
  await recipe.updateOne(
    { title: req.body.title ?? recipe.title, ingredients: req.body.ingredients ?? recipe.ingredients, description: req.body.description ?? recipe.description, updatedBy: req.user._id })

  res.status(StatusCodes.OK).send(`Recipe with id ${req.params.id} is succesfully updated`)
}

const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.id })
  if (!recipe) {
    throw new NotFoundError(`Can't delete. No recipe with id ${req.params.id}`)
  }
  await recipe.remove({ _id: req.params.id, })
  res.status(StatusCodes.OK).send(`Recipe with id ${req.params.id} is succesfully deleted`)
}

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
}
