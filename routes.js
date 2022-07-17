const router = require('express').Router();
const homeController = require('./controllers/homeController');
// const createController = require('./controllers/createController');
// const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

router.use('/', homeController);
// router.use('/cube', createController);
// router.use('/accessory', accessoryController);
router.use('/auth', authController);

module.exports = router;