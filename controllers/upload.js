const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { decodeUser } = require('../utils/utils')

const Image = require('../models/Image')
const Recipe = require('../models/Recipe')

const getImage = async (req, res) => {
    const image = await Image.findOne({ _id: req.params.id }).lean().exec();
    res.status(StatusCodes.OK).send(image)
}

const addImage = async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.id })
    if (!recipe) {
        throw new NotFoundError(`No recipe with id ${req.params.id}`)
    }
    console.log(req.file.buffer)
    const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
    if (image.contentType === 'image/jpeg' || image.contentType === 'image/png' || image.contentType === 'image/jpg') {
        const newImage = await Image.create({ image: image, recipe: recipe._id })
        await recipe.updateOne({ image: newImage })
        console.log(image);
        res.status(StatusCodes.CREATED).json({ image })
    } else {
        throw new BadRequestError(`Wrong file type`)
    }
}

module.exports = {
    getImage,
    addImage,
}