const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const sequelize = require('./db/db');
const sessionConfig = require('./config/session')
const session = require('express-session');

// Middleware para gestionar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos dinamicos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para servir archivos estáticos
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(session({
  secret: 'secret',  
  resave: true,     
  saveUninitialized: true 
}));

//proyecto de rutas
app.use('/', require('./routes/userRoutes'))

//para que las vistas(html/ejs) los busque en la carpeta views(pages).
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(sessionConfig);

// Sincronizar el modelo con la base de datos
sequelize.sync({}) 
  .then(() => {
    console.log('Tablas creadas.');
  })
  .catch(err => console.error('Error creando tablas:', err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
