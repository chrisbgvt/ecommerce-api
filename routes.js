const router = require('express').Router();
const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');
const authController = require('./controllers/authController');

router.use('/', homeController);
router.use('/products', productController);
router.use('/cart', cartController);
router.use('/order', orderController);
router.use('/auth', authController);

module.exports = router;