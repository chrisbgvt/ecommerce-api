const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAdmin } = require('../middlewares/authMiddleware');

const productService = require('../services/productService');

// Create Product
router.post('/', isAdmin, async (req, res) => {
    let {title, image, price, quantity, description} = req.body;
    let product = req.body;

    if(title < 2 || quantity < 0) {
        return res.status(500).json({ error: 'Must be at lest 2 symbols' }); 
    }

    if(price < 1 && price > 1000) {
        return res.status(500).json({ error: 'Price must be between 1 and 1000' }); 
    }

    if(description < 11) {
        return res.status(500).json({ error: 'Desc must be at least 10 symbols' }); 
    }

    try {
        await productService.create(product);
        
        res.status(200).json({message: 'Product created!'});
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
});

// Get All
router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll().lean();

        res.status(200).json(products);
    } catch(error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
    
});

// Get one by ID
router.get('/:productId', async (req, res) => {
    try {
        const product = await productService.getById(req.params.productId);

        res.json(product);
    } catch(error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
    
});

// Edit
router.put('/:productId', isAdmin, async (req, res) => {
    const productData = req.body;

    try {
        await productService.edit(req.params.productId, productData);
        
        res.status(200).json(productData);
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
});

// Delete
router.delete('/:productId', isAdmin, async (req, res) => {
    
    try {
        const product = await productService.delete(req.params.productId);

        res.status(200).json({message: 'Product deleted successfully!'});
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) }); 
    }
});


module.exports = router;