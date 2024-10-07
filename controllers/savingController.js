const Saving = require('../db/models/saving.js');

const displaySaving = async (req, res) => {
    const usuarioId = req.session.user ? req.session.user.id : null; 

    try {
        const data = await Saving.findAll({ where: { UserId: usuarioId } });
        const ahorrosOrdenados = data.sort((a, b) => a.createdAt - b.createdAt); 

        res.render('saving', { 
            user: req.session.user || null, 
            savings: ahorrosOrdenados 
        });
    } catch (error) {
        console.error('Error al cargar los ahorros:', error);
        res.send('Hubo un error al cargar los ahorros.');
    }
};

const addSaving = async (req,res) => {
    const goalName = req.body.goalName; 
    const goalAmount = req.body.goalAmount; 
    const savedAmount = req.body.savedAmount; 
    const userId = req.body.userId; 

    try {
        const newSaving = await Saving.create({
            name: goalName,
            monto_obj: goalAmount,
            monto_ah: savedAmount,
            UserId: userId 
        });

        res.redirect('/saving');
    } catch (error) {
        console.error('Error al crear el ahorro:', error);
        res.render('/saving', {
        });
    }
};

const editSaving = async (req, res) => {
    const savingId = req.body.id;
    const usuarioId = req.session.user ? req.session.user.id : null;
    const { name, monto_obj, monto_ah } = req.body;
  
    try {
        const saving = await Saving.findOne({
            where: {
                id: savingId,
                userId: usuarioId 
            }
        });
  
        if (saving) {
            await Saving.update(
                { name, monto_obj, monto_ah },
                { where: { id: savingId } } 
            );
            
            res.json({ success: true }); 
        } else {
            res.status(404).send('Saving no encontrado.');
        }
    } catch (error) {
        console.error('Error al editar el saving:', error);
        res.status(500).send('Hubo un error al editar el saving.');
    }
  };

const deleteSaving = async (req, res) => {
    const savingId = req.params.id; 
    const userId = req.session.user ? req.session.user.id : null;

    // Verificar si el ahorro pertenece al usuario
    const saving = await Saving.findOne({
        where: {
            id: savingId,
            UserId: userId 
        }
    });

    if (saving) {
        try {
            // Eliminar el ahorro de la base de datos
            await Saving.destroy({
                where: { id: savingId }
            });

            res.json({ success: true }); 
        } catch (error) {
            console.error('Error al eliminar el ahorro:', error);
            res.json({ success: false }); 
        }
    } else {
        res.json({ success: false }); 
    }
};


module.exports = {
    displaySaving,
    addSaving,
    editSaving,
    deleteSaving
}