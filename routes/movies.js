import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
//import { MovieModel } from "../models/mysql/movie.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

  moviesRouter.get("/", movieController.getAll);

  moviesRouter.post("/", movieController.create);

  moviesRouter.get("/:id", movieController.getById);

  moviesRouter.delete("/:id", movieController.delete);

  moviesRouter.patch("/:id", movieController.update);

   // Cambiamos la ruta para usar query params
   moviesRouter.get("/auth/user", movieController.getUser); // Nota: movido antes de las rutas con :id

  return moviesRouter;
};
