const router = require('express').Router();
const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');
// const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

router.use('/', homeController);
router.use('/products', productController);
// router.use('/accessory', accessoryController);
router.use('/auth', authController);

module.exports = router;