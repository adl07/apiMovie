import express, { json } from "express";
import { createMovieRouter } from "./routes/movies.js";
import { testConnection } from "./models/movie.js";

export const createApp = async ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.disable("x-powered-by");

  // Verificar conexión a la base de datos
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error("No se pudo establecer conexión con la base de datos");
  }

  // Middleware para manejar errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Error interno del servidor",
      message:
        process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
    });
  });

  app.use("/movies", createMovieRouter({ movieModel }));

  // Ruta de health check
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  return app;
};

import { MovieModel } from "./models/movie.js";

// Inicialización con manejo de errores
let app;
try {
  app = await createApp({ movieModel: MovieModel });
} catch (error) {
  console.error("Error al inicializar la aplicación:", error);
  // Crear una aplicación mínima para mostrar el error
  app = express();
  app.use((req, res) => {
    res.status(500).json({
      error: "Error de inicialización",
      message: "No se pudo inicializar la aplicación correctamente",
    });
  });
}

export default app;

/* app.options("/movies/:id", (req, res) => {
  const origin = req.header("origin");

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Origin-Methods",
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    );
  }
  res.sendStatus(200);
}); */
