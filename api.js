import express from "express";
import { createMovieRouter } from "./routes/movies.js";
import { MovieModel, testConnection } from "./models/movie.js";

const app = express();

app.use(express.json());
app.disable("x-powered-by");

// Ruta de health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Inicialización con manejo de errores
const initializeApp = async () => {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error("No se pudo establecer conexión con la base de datos");
    }

    app.use("/movies", createMovieRouter({ movieModel: MovieModel }));

    // Middleware para manejar errores
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({
        error: "Error interno del servidor",
        message:
          process.env.NODE_ENV === "production"
            ? "Algo salió mal"
            : err.message,
      });
    });
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
    app.use((req, res) => {
      res.status(500).json({
        error: "Error de inicialización",
        message: "No se pudo inicializar la aplicación correctamente",
      });
    });
  }
};

initializeApp();

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
