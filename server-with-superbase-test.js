import app from "./index.js";
import { MovieModel } from "./models/superbase-test/movie.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3000;

// Verificar conexión antes de iniciar el servidor
async function startServer() {
  try {
    const isConnected = await MovieModel.checkConnection();
    if (!isConnected) {
      console.error('No se pudo establecer conexión con la base de datos');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Conexión con la base de datos establecida');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
  // No cerrar el servidor, solo registrar el error
});

process.on('unhandledRejection', (error) => {
  console.error('Promesa rechazada no manejada:', error);
  // No cerrar el servidor, solo registrar el error
});


/* import { createApp } from "./index.js";
import { MovieModel } from "./models/superbase-test/movie.js";

createApp({ movieModel: MovieModel }); */