import { createClient } from "@supabase/supabase-js";

// Inicializa el cliente de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// Asegúrate de haber importado y configurado correctamente el cliente de Supabase

export class MovieModel {
  static async getAll({ genre }) {
    try {
      let query = supabase.from("movies").select("*");
      if (genre) {
        query = query.eq("genre", genre);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("No se pudieron obtener las películas");
    }
  }

  static async getById({ id }) {
    try {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error en getById:", error);
      throw new Error("No se pudo obtener la película");
    }
  }

  static async create({ input }) {
    const { title, year, duration, director, rate, poster } = input;
    try {
      const { data, error } = await supabase
        .from("movies")
        .insert([{ title, year, duration, director, rate, poster }])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Error en create:", error);
      throw new Error("No se pudo crear la película");
    }
  }

  static async delete({ id }) {
    try {
      const { error } = await supabase.from("movies").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error en delete:", error);
      throw new Error("No se pudo eliminar la película");
    }
  }

  static async update({ id, input }) {
    try {
      const { data, error } = await supabase
        .from("movies")
        .update(input)
        .eq("id", id)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Error en update:", error);
      throw new Error("No se pudo actualizar la película");
    }
  } 
}



async function testSupabaseIntegration() {
    try {
      // Probar getAll
      const allMovies = await MovieModel.getAll({});
      console.log("Todas las películas:", allMovies);
  
      // Probar getById (asegúrate de usar un ID válido de las películas que añadiste)
      const movieId = '65d41b6a-68ae-4298-a589-8f2fba1acdbc';
      const singleMovie = await MovieModel.getById({ id: movieId });
      console.log("Película individual:", singleMovie);
  
      // Probar create
      //const newMovie = await MovieModel.create({
      //  input: {
      //    title: "Nueva Película de Prueba",
      //    year: 2023,
      //    director: "Director de Prueba",
      //    duration: 120,
      //    poster: "https://ejemplo.com/poster.jpg",
      //    rate: 8.5
      //  }
      //});
      //console.log("Nueva película creada:", newMovie);
  
      // Puedes añadir más pruebas para update y delete aquí
  
    } catch (error) {
      console.error("Error durante las pruebas:", error);
    }
  }
  
  testSupabaseIntegration();