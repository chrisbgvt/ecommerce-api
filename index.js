const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { PORT } = require('./config/env');
const routes = require('./routes');
const { initializeDatabase } = require('./config/DB');
const {auth} = require('./middlewares/authMiddleware');
const {errorHandler} = require('./middlewares/errorHandlerMiddleware');
const cors = require('./middlewares/corsMiddleware');

// require('./config/hbs')(app);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/public', express.static('public'));
app.use(auth);
app.use(routes);
app.use(errorHandler);

initializeDatabase()
    .then(() => {
        app.listen(PORT, () => { console.log(`Listenning on port ${PORT}...`) });
    })
    .catch((err) => {
        console.log(err);
    });