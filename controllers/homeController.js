const router = require('express').Router();

router.get('/', async (req, res) => {
    res.json([{message: 'home'}]);
});


module.exports = router;