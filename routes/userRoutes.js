const express = require('express');
const app = express.Router();
const { displayIndex } = require('../controllers/indexController');
const { displayLogin, validateLogin, logout } = require('../controllers/loginController');
const { displayRegister, register, checkMail } = require('../controllers/regController');
const { displayPayment } = require('../controllers/paymentController');
const { displaySaving } = require('../controllers/savingController');
const { displayDolar } = require('../controllers/dolarController');
const { displayInvest } = require('../controllers/investController');

// Rutas 
app.get('/', displayIndex)

//User routes
app.get('/login', displayLogin)
//app.post('/login', validateLogin)
//app.post('/logout', logout)

app.get('/register', displayRegister)
//app.post('/register', register)
//app.post('/checkMail', checkMail)

app.get('/payment', displayPayment)
app.get('/saving', displaySaving)
app.get('/dolarToday', displayDolar)
app.get('/invest', displayInvest)



module.exports = app;
