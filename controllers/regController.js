const User = require('../db/models/user.js');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Si se ingresa el nombre todo en mayuscula o de forma
 * desprolija esto lo corrige, una mayuscula al comienzo de cada palabra
 */
function convertirNombre(nombre) {
    const palabras = nombre.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
    }
    return palabras.join(" ");
  }

function validarCampos(mail , pass , name){
    if(!mail || !pass || !name ){
        console.error('Validacion invalida, campos incompletos');
        return false
    }
    if(pass.length<4){
        console.error('Validacion invalida, contraseña muy corta');
        return false
    }

    return true
}

const displayRegister = (req,res) =>{
    res.render('register',{ user: req.session.user || null })
}

/**
 * Hace todas las validaciones del Back-End y se crea el user en la BD
 */
const register = async (req, res) => {    
    const mail = req.body.mail.toLowerCase();
    const name = convertirNombre(req.body.name);
    const pass = req.body.pass;
    const confirmPass = req.body.confirmPassword;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    let rol = req.body.rol;

    // Validar que todos los campos estén presentes
    if (!validarCampos(mail, pass, name)) {
        return res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Campos incompletos o inválidos",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    }

    // Validar que las contraseñas coincidan
    if (pass !== confirmPass) {
        return res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Las contraseñas no coinciden",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    }

    // Verificar si el correo ya está registrado
    if (await existe_duplicado(mail)) {
        console.error('Error al crear usuario, mail duplicado');
        return res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "El correo electrónico ya está registrado",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    }

    // Crear el usuario en la base de datos
    User.create({
        name: name,
        mail: mail,
        pass: hashedPassword,
        rol: rol,
    })
    .then(user => {
        res.render('register', {
            alert: true,
            alertTitle: "Registración exitosa",
            alertMessage: "",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
        });
    })
    .catch(error => {
        console.error('Error al crear usuario:', error);
        res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error al registrar el usuario",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    });
}

/**
 * Devuelve true si ya existe un usuario con ese mail
 */
async function existe_duplicado(email) {
    const user = await User.findOne({
        where: {mail: email}
    });
    if(user)
        return true;
    return false;
}

/**
 * valida en el Front-End que no haya un mail ya registrado
 */
const checkMail = async (req, res) => {
    const { email } = req.body;
    if (await existe_duplicado(email))
        res.json({ exists: true });
    else
        res.json({ exists: false });
};


module.exports = {
    convertirNombre,
    validarCampos,
    register,
    displayRegister,
    checkMail,
}