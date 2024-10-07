const Task = require('../db/models/task.js'); 

const displayPayment = async (req, res) => {
    try {
      // Asegúrate de tener el ID del usuario en la sesión
      const userId = req.session.user.id;
  
      // Filtra las tareas por el usuario actual
      const data = await Task.findAll({
        where: {
          userId: userId
        }
      });
  
      const tareasOrdenadas = data.sort((a, b) => a.date_ini - b.date_ini);
  
      // Formatea las fechas antes de enviarlas a la vista
      const tareasFormateadas = tareasOrdenadas.map(tarea => {
        return {
          ...tarea.dataValues,
          date_ini: new Date(tarea.date_ini).toLocaleDateString(), 
          date_end: new Date(tarea.date_end).toLocaleDateString() 
        };
      });
  
      res.render('payment', { 
        user: req.session.user || null, 
        tareas: tareasFormateadas 
      });
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      res.send('Hubo un error al cargar las tareas.');
    }
  };
  


const createTask = async (req, res) => {
    const { date_ini, date_end, descrip, userId } = req.body;

    if (!date_ini || !date_end || !descrip || !userId) {
        console.log('Faltan datos en el formulario o en la sesión');
    }

    try {
        const newTask = await Task.create({
            date_ini,
            date_end,
            descrip,
            UserId: userId  
        });

        res.redirect('/payment');
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.render('/payment', {
        });
    }
}

const deleteTask = async (req, res) => {
    const tareaId = req.params.id; 
    const usuarioId = req.session.user ? req.session.user.id : null;

    // Verificar si el usuario es el dueño de la tarea
    const tarea = await Task.findOne({
        where: {
            id: tareaId,
            UserId: usuarioId 
        }
    });

    if (tarea) {
        try {
            // Eliminar la tarea de la base de datos
            await Task.destroy({
                where: { id: tareaId }
            });

            res.json({ success: true }); 
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            res.json({ success: false }); 
        }
    } else {
        res.json({ success: false }); 
    }
}


module.exports = {
    displayPayment,
    createTask,
    deleteTask
}

