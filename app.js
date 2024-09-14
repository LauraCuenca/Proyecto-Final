const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const sequelize = require('./db/db');

// Middleware para gestionar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//proyecto de rutas
app.use('/', require('./routes/userRoutes'))

//para que las vistas(html/ejs) los busque en la carpeta views(pages).
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Sincronizar el modelo con la base de datos
sequelize.sync({ force: true }) // 'force: true' recrea las tablas
  .then(() => {
    console.log('Tablas creadas.');
  })
  .catch(err => console.error('Error creando tablas:', err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
