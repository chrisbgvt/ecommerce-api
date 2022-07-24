const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');

const cartService = require('../services/cartService');
const userService = require('../services/userService');
const orderService = require('../services/orderServices');

// Create Order
router.post('/', async (req, res) => {

    try {
        const userCart = await cartService.getAll();

        let order = [];
        let totalPrice = 0;

        userCart[0].products.map(x => (order.push(x.title), totalPrice += Number(x.price)));

        const newOrder = await orderService.create({titles: order, totalPrice, userId: userCart[0].userId});

        const user = await userService.getById(userCart[0].userId);
        user.cart = [];
        user.orders.push(newOrder);
        await user.save();
        await cartService.delete(userCart[0]._id);
        
        res.status(200).json({message: 'Order created!'});
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
});

// Get Orders
router.get('/:userId', async (req, res) => {
    try {
        const orders = await orderService.getOrdersOfUser(req.params.userId);

        res.json(orders);
    } catch(error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
    
});


module.exports = router;