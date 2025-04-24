//import { MovieModel } from "../models/movie.js";
//import { MovieModel } from "../models/mysql/movie.js";

import { validateMovie, validatePartialMovie, validateRegistreUser } from "../schemas/movie.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const JWT_SECRET = process.env.JWT_SECRET


export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
    console.log(
      "MovieModel methods:",
      Object.getOwnPropertyNames(this.movieModel)
    );
  }

  getAll = async (req, res) => {
    try {
      const { genre } = req.query;
      const movies = await this.movieModel.getAll({ genre });
      return res.json(movies);
    } catch (error) {
      console.error("Error en controller getAll:", error);
      return res.status(500).json({
        error: "Error interno",
        message: error.message || "Error al obtener las películas",
      });
    }
  };


  
  getUser = async (req, res) => {
    try {
      const { user } = req.params;
      const users = await this.movieModel.getUser({ user });
      if (!users) {
        return res.status(404).json({
          error: "No encontrado",
          message: "Usuario no encontrado",
        });
      }

      //Generacion token//

      const token = jwt.sign({
        id: users.id,
        username: users.username,
      },
      JWT_SECRET,
      {expiresIn: "1h" // token válido por 1 hora// 
        }
    )
      return res
      .cookie('access_token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' && req.hostname !== 'localhost',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .json({
        user: users,
        token: token
      });
    } catch (error) {
      console.error("Error en controller getUser:", error);
      return res.status(500).json({
        error: "Error interno",
        message: error.message || "Error al obtener el usuario",
      });
    }
  };

  getMoviesFav = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("Recibida petición para userId:", userId);

      if (!userId) {
        console.log("UserId no proporcionado");
        return res.status(400).json({
          error: "Bad Request",
          message: "Se requiere el ID del usuario",
        });
      }

      const movies = await this.movieModel.getMoviesFav({ userId });
      console.log("Respuesta del modelo:", movies);

      if (!movies) {
        return res.status(404).json({
          error: "Not Found",
          message: "Usuario no encontrado",
        });
      }

      if (movies.length === 0) {
        return res.status(404).json({
          error: "Not Found",
          message: "No se encontraron películas favoritas para este usuario",
        });
      }

      return res.json(movies);
    } catch (error) {
      console.error("Error completo:", error);
      return res.status(500).json({
        error: "Error interno",
        message: error.message || "Error al obtener las películas favoritas",
      });
    }
  };

  addMovieList = async (req, res) => {
    try {
      console.log("[DEBUG] Body recibido:", req.body);
      const { idUser, idMovie } = req.body;

      if (!idUser || !idMovie) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Se requieren idUser e idMovie en el body",
        });
      }

      const newMovieFav = await this.movieModel.addMovieList({
        idUser,
        idMovie,
      });

      return res.status(201).json(newMovieFav);
    } catch (error) {
      console.error("[DEBUG] Error en controller addMovieList:", error);
      res.status(500).json({
        error: "Error interno",
        message: error.message,
      });
    }
  };


  updateMovieList = async(req, res)=>{
    try {
      console.log("[DEBUG] Body recibido:", req.body)

      const { idUser, idMovie } = req.body

      if (!idUser || !idMovie) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Se requieren idUser e idMovie en el body",
        });
      }

      const updateMovieFav = await this.movieModel.updateMovieList({
        idUser,
        idMovie,
      });

      if (!updateMovieFav) {
        return res.status(404).json({ error: "No se encontró la película o no se pudo actualizar" });
      }

      console.log("Película actualizada:", updateMovieFav);
      return res.status(200).json(updateMovieFav);

    } catch (error) {
      console.error("[DEBUG] Error en controller updateMovieList:", error);
      res.status(500).json({
        error: "Error interno",
        message: error.message,
      });
    }
  }
  
  getById = async (req, res) => {
    try {
      const { id } = req.params;

      // Validar formato UUID
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        return res.status(400).json({
          error: "ID inválido",
          message: "El ID debe ser un UUID válido",
        });
      }

      const movie = await this.movieModel.getById({ id });

      if (!movie) {
        return res.status(404).json({
          error: "No encontrada",
          message: "Película no encontrada",
        });
      }

      return res.json(movie);
    } catch (error) {
      console.error("Error en controller getById:", error);
      return res.status(500).json({
        error: "Error interno",
        message: error.message || "Error al obtener la película",
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

  createUser = async (req, res)=>{
    const result = validateRegistreUser(req.body);
    if(!result.success){
      return res.status(400).json({error: JSON.parse(result.error.message)});
    }
    const newUser = await this.movieModel.createUser({input: result.data})

    res.status(201).json(newUser);
  }

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
