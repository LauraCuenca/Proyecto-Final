const User = require('../db/models/user.js');
const session = require('express-session');
const bcrypt = require('bcrypt');

const displayLogin = (req, res) => {
    if (session.loggedin) {
        res.send("ya tiene una sesion iniciada")
        return
    }
    res.render('login',{ user: req.session.user || null })
}

const validateLogin = async (req, res) => {
    try {
        const mail = req.body.mail;
        const pass = req.body.pass;

        if (!mail || !pass) {
            console.error('Error: campos incompletos');
            return res.status(400).send('Faltan datos');
        }

        const usuarioEncontrado = await User.findOne({ where: { mail: mail } });

        if (!usuarioEncontrado) {
            return res.render('login');
        }

        const passwordMatch = await bcrypt.compare(pass, usuarioEncontrado.pass);

        if (!passwordMatch) {
            return res.render('login');
        }

        // Si la contraseña es correcta
        req.session.user = usuarioEncontrado.dataValues;
        req.session.loggedin = true;

        return res.redirect('/?login=success'); 

    } catch (error) {
        console.error(error);
        return res.status(500).send('Ocurrió un error en el servidor');
    }
};


const logout = (req, res) => {
    console.log("Cierre de sesión solicitado");

    // Destruir la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al destruir la sesión:", err);
            return res.status(500).send("No se pudo cerrar la sesión");
        }

        console.log("Cierre de sesión completado");
        res.clearCookie('connect.sid'); 
        res.redirect('/'); 
    });
};



/**
 * MIDDLEWARE comprobar sesion:
 * Comprueba que tenga una sesion iniciada
 */
const comprobar_sesion = (req, res, next) => {
    if (session.loggedin) {
        next();
    } else {
        res.redirect('/login',{ user: req.session.user || null });
    }
};

module.exports = {
    validateLogin,
    displayLogin,
    comprobar_sesion,
    logout,
}