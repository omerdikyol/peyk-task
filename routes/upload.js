const express = require('express')

const router = express.Router()
const { getImage, addImage } = require('../controllers/upload')

var multer = require('multer');

var storage = multer.memoryStorage();

var upload = multer({ storage: storage });

router.route('/image/:id').get(getImage)

router.route('/image/:id').post(upload.single('image'), async (req, res) => {
    addImage(req, res);
});

module.exports = router
