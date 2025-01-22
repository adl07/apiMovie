import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
//import { MovieModel } from "../models/mysql/movie.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

  // Asegúrate de que esta ruta esté antes de cualquier ruta que use parámetros dinámicos como :id
  moviesRouter.get("/users", movieController.getUser);

  moviesRouter.get("/", movieController.getAll);

  moviesRouter.post("/", movieController.create);

  moviesRouter.get("/:id", movieController.getById);

  moviesRouter.delete("/:id", movieController.delete);

  moviesRouter.patch("/:id", movieController.update);

  return moviesRouter;
};
