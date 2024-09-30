const Saving = require('../db/models/saving.js');

const displaySaving = (req,res) => {
    res.render('saving',{ user: req.session.user || null })
}

const addSaving = async (req, res) => {
    const goalName = req.body.goalName; 
    const goalAmount = req.body.goalAmount; 
    const savedAmount = req.body.savedAmount; 
    const color = req.body.color; 

    try {
       
        const nuevoAhorro = await Saving.create({
            name: goalName,
            monto_obj: goalAmount,
            monto_ah: savedAmount,
            color: color 
        });

        
        res.status(201).json({ message: 'Ahorro agregado exitosamente', nuevoAhorro });
    } catch (error) {
        console.error('Error al agregar el ahorro:', error);
        res.status(500).json({ message: 'Error al agregar el ahorro', error });
    }
};

module.exports = {
    displaySaving,
    addSaving
}