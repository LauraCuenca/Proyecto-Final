const express = require('express');
const app = express.Router();
const { displayIndex } = require('../controllers/indexController');
const { displayLogin, validateLogin, logout } = require('../controllers/loginController');
const { displayRegister, register, checkMail } = require('../controllers/regController');
const { displayPayment, createTask, deleteTask } = require('../controllers/paymentController');
const { displaySaving, addSaving ,deleteSaving } = require('../controllers/savingController');
const { displayDolar } = require('../controllers/dolarController');
const { displayInvest } = require('../controllers/investController');
const { displayProm } = require('../controllers/promController');

// Rutas 
app.get('/', displayIndex)

//User routes
app.get('/login', displayLogin)
app.post('/login', validateLogin)
app.post('/logout', logout)

app.get('/register', displayRegister)
app.post('/register', register)
app.post('/checkMail', checkMail)

app.get('/payment', displayPayment)
app.post('/createTask', createTask)
app.post('/deleteTask/:id', deleteTask)
app.get('/saving', displaySaving)
app.post('/addSaving', addSaving)
app.post('/deleteSaving/:id', deleteSaving)
app.get('/dolarToday', displayDolar)
app.get('/invest', displayInvest)
app.get('/promo', displayProm)


module.exports = app;
