import mysql from "mysql2/promise";

const DATABASE_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "moviesdb",
};

const connection = await mysql.createConnection(DATABASE_CONFIG);

export class MovieModel {
  static async getAll({ genre }) {
    const [movies] = await connection.query(
      "SELECT title,year, director,duration,poster,rate, BIN_TO_UUID(id) id from movie"
    );

    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title,year, director,duration,poster,rate,BIN_TO_UUID(id) id 
      from movie where id = UUID_TO_BIN(?);`,
      [id]
    );

    if (movies.length === 0) return null;

    return movies;
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    //creando los UUID utilizando el sql//
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");

    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie(id,title, year, duration, director, rate,poster)
          VALUES(UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ? );`,
        [title, year, duration, director, rate, poster]
      );
    } catch (e) {
      throw new Error("Error al crear movies");
    }

    const [movies] = await connection.query(
      `SELECT title,year, director,duration,poster,rate,BIN_TO_UUID(id) id 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
