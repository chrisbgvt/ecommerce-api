const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');

const cartService = require('../services/cartService');
const userService = require('../services/userService');

// Create Cart
router.post('/', async (req, res) => {
    let cart = req.body;
    

    if(cart.products.productId) {
        return res.status(500).json({ error: 'Product id is not defined' }); 
    }

    if(cart.products.title < 2 || cart.products.quantity < 0) {
        return res.status(500).json({ error: 'Must be at lest 2 symbols' }); 
    }

    if(cart.products.price < 1 && cart.products.price > 1000) {
        return res.status(500).json({ error: 'Price must be between 1 and 1000' }); 
    }

    try {
        const createdCart = await cartService.create(cart);
        const user = await userService.getById(createdCart.userId);
        user.cart.push(createdCart._id);
        await user.save();
        
        res.status(200).json(createdCart);
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
});


// Update Cart
router.patch('/', async (req, res) => {
    let cart = req.body;
    

    if(cart.products.productId) {
        return res.status(500).json({ error: 'Product id is not defined' }); 
    }

    if(cart.products.title < 2 || cart.products.quantity < 0) {
        return res.status(500).json({ error: 'Must be at lest 2 symbols' }); 
    }

    if(cart.products.price < 1 && cart.products.price > 1000) {
        return res.status(500).json({ error: 'Price must be between 1 and 1000' }); 
    }


    try {
        const user = await userService.getByIdPopulated(cart.userId);

        const cartId = user.cart[user.cart.length - 1]._id;

        const cartData = await cartService.getById(cartId);

        if(cartData.products.find(x => x.productId == cart.products[0].productId)) {
            cartData.products.map(x => x.productId == cart.products[0].productId ? (x.quantity += cart.products[0].quantity, x.price += (cart.products[0].price * cart.products[0].quantity)) : x)
        } else {
            cartData.products.push(cart.products[0]);
        }

        
        await cartService.edit(cartId, cartData);
        const updatedCart = await cartService.getById(cartId);
        
        
        res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
});

// Get all carts
router.get('/', async (req, res) => {
    try {
        const cart = await cartService.getAll();

        res.json(cart);
    } catch(error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
    
});

// Get cart by ID
router.get('/:cartId', async (req, res) => {
    try {
        const cart = await cartService.getById(req.params.cartId);

        res.json(cart);
    } catch(error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
    
});

// Delete Cart
router.delete('/:cartId', async (req, res) => {
    try {
        const cart = await cartService.getById(req.params.cartId);
        const user = await userService.getById(cart.userId);

        await cartService.delete(req.params.cartId);
        user.cart = [];
        await user.save();
        
        res.status(200).json({message: 'Cart deleted successfully!'});
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
});


module.exports = router;