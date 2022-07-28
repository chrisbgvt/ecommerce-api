const router = require('express').Router();

const authService = require('../services/authService');

// const { COOKIE_SESSION_NAME } = require('../constants');

// const { isAuth, isLoggedUser } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authService.login(username, password);
        const token = await authService.createToken(user);

        res.status(200).json({token: token, userId: user._id, userRole: user.role});

        // res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true});

        // res.redirect('/');
    } catch (error) {
        // return res.render('auth/login', { error: getErrorMessage(error) });
        return res.status(500).json({ error: getErrorMessage(error) });
    }
    
});

// router.get('/register', isLoggedUser, async (req, res) => {
//     res.render('auth/register');
// });

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword, role } = req.body;

    if(password !== repeatPassword) {
        // return res.render('auth/register', { error: 'Password mismatch' });
        return res.json({ error: 'Password mismatch' });
    }

    if(role == ' ') {
        return res.json({ error: 'Role is required' });
    }

    //Create user
    try {
        const createdUser = await authService.register({username, password, role});
        // const token = await authService.createToken(createdUser);

        res.status(200).json({message: `User ${createdUser.username} created successfully!`});

        // res.cookie(COOKIE_SESSION_NAME, token, {httpOnly: true});

        // res.redirect('/');

    } catch (error) {
        // return res.render('auth/register', { error: getErrorMessage(error) });

        return res.status(500).json({ error: getErrorMessage(error) });
    }

});


module.exports = router;