import mysql from "mysql2/promise";

const DATABASE_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(DATABASE_CONFIG);

export class MovieModel {
  static async getAll({ genre }) {
    try {
      const [movies] = await pool.query(
        "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie"
      );
      return movies;
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("No se pudieron obtener las películas");
    }
  }

  static async getById({ id }) {
    try {
      const [movies] = await pool.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
      );
      return movies.length === 0 ? null : movies[0];
    } catch (error) {
      console.error("Error en getById:", error);
      throw new Error("No se pudo obtener la película");
    }
  }

  static async create({ input }) {
    const { title, year, duration, director, rate, poster } = input;

    try {
      const [uuidResult] = await pool.query("SELECT UUID() uuid;");
      const [{ uuid }] = uuidResult;

      await pool.query(
        `INSERT INTO movie(id, title, year, duration, director, rate, poster)
        VALUES(UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, duration, director, rate, poster]
      );

      const [movies] = await pool.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
      );

      return movies[0];
    } catch (error) {
      console.error("Error en create:", error);
      throw new Error("No se pudo crear la película");
    }
  }

  static async delete({ id }) {
    // Implementa la lógica de eliminación aquí
  }

  static async update({ id, input }) {
    // Implementa la lógica de actualización aquí
  }
}

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión a la base de datos exitosa");
    connection.release();
    return true;
  } catch (error) {
    console.error("Falló la conexión a la base de datos:", error);
    return false;
  }
}
