const multer = require('multer'),
      path = require('path')
    
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileUpload = multer({
  storage: diskstorage
}).single('image')


const Router = require('express').Router()

const imagesControllers = require('../controllers/imagesControllers')

const {saveImage,getAll} = imagesControllers

Router.route('/images')
.post(fileUpload,saveImage)
.get(getAll)

module.exports = Router