const Task = require('../db/models/task.js'); 
const session = require('express-session');

const displayPayment = (req,res) => {
    res.render('payment')
}
const createTask = async (req, res) => {
    const date_ini = req.body.date_ini;
    const date_end = req.body.date_end;
    const descrip = req.body.descrip;

    // Validar que todos los campos estén presentes
    if (!date_ini || !date_end || !descrip) {
        return res.render('create-task', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Todos los campos son obligatorios",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    }

    // Crear la tarea en la base de datos
    Task.create({
        date_ini: date_ini,
        date_end: date_end,
        descrip: descrip,
    })
    .then(task => {
        res.render('create-task', {
            alert: true,
            alertTitle: "Tarea creada con éxito",
            alertMessage: "",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
        });
    })
    .catch(error => {
        console.error('Error al crear tarea:', error);
        res.render('create-task', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error al crear la tarea",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    });
}

module.exports = {
    displayPayment,
    createTask
}

