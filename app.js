const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para gestionar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('¡Hola, bienvenido a mi aplicación Express!');
});

app.get('/api/data', (req, res) => {
  res.json({ mensaje: '' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
