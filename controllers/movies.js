//import { MovieModel } from "../models/movie.js";
//import { MovieModel } from "../models/mysql/movie.js";

import { validateMovie, validatePartialMovie } from "../schemas/movie.js";

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
    console.log("MovieModel methods:", Object.getOwnPropertyNames(this.movieModel))
  }

  getAll = async (req, res) => {
    try {
      const { genre } = req.query;
      const movies = await this.movieModel.getAll({ genre });
      return res.json(movies);
    } catch (error) {
      console.error('Error en controller getAll:', error);
      return res.status(500).json({ 
        error: 'Error interno', 
        message: error.message || 'Error al obtener las películas' 
      });
    }
  };

  getUser = async (req, res) => {
    try {
      const { user } = req.params;
      const users = await this.movieModel.getUser({user})
      if (!users) {
        return res.status(404).json({ 
          error: 'No encontrado',
          message: 'Usuario no encontrado' 
        });
      }
      return res.json(users)
    } catch (error) {
      console.error("Error en controller getUser:", error)
      return res.status(500).json({
        error: "Error interno",
        message: error.message || "Error al obtener el usuario",
      })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validar formato UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        return res.status(400).json({ 
          error: 'ID inválido', 
          message: 'El ID debe ser un UUID válido' 
        });
      }

      const movie = await this.movieModel.getById({ id });
      
      if (!movie) {
        return res.status(404).json({ 
          error: 'No encontrada',
          message: 'Película no encontrada' 
        });
      }

      return res.json(movie);
    } catch (error) {
      console.error('Error en controller getById:', error);
      return res.status(500).json({ 
        error: 'Error interno', 
        message: error.message || 'Error al obtener la película' 
      });
    }
  };

  create = async (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await this.movieModel.create({ input: result.data });

    res.status(201).json(newMovie);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.movieModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ message: "movie not found" });
    }
    return res.json({ message: "movie deleted" });
  };

  update = async (req, res) => {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updateMovie = await this.movieModel.update({
      id,
      input: result.data,
    });

    return res.json(updateMovie);
  };
}
