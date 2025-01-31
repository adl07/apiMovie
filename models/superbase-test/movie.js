import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();


// Inicializa el cliente de Supabase con mejor manejo de errores
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Las variables de entorno de Supabase no están configuradas correctamente');
}

let supabase = createClient(supabaseUrl, supabaseKey);

// Función para reiniciar el cliente de Supabase
const resetSupabaseClient = () => {
  supabase = createClient(supabaseUrl, supabaseKey);
};


export class MovieModel {
  static async getAll({ genre } = {}) {
    try {
      let query = supabase.from("movies").select("*");
      
      // Solo aplicar el filtro de género si existe la columna
      // Primero verificamos la estructura de la tabla
      const { data: tableInfo, error: tableError } = await supabase
        .from('movies')
        .select('*')
        .limit(1);

      if (tableError) {
        console.error('Error al verificar la estructura de la tabla:', tableError);
        throw new Error("Error al acceder a la base de datos");
      }

      // Si se proporciona género y la columna existe, aplicar el filtro
      if (genre && tableInfo && tableInfo[0] && 'genre' in tableInfo[0]) {
        query = query.eq("genre", genre.toUpperCase());
      } else if (genre) {
        console.warn('La columna genre no existe en la tabla movies');
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error en getAll:', error);
        resetSupabaseClient();
        throw new Error("Error al obtener las películas");
      }
      
      return data;
    } catch (error) {
      console.error("Error en getAll:", error);
      // Intentar reconectar en caso de error de conexión
      resetSupabaseClient();
      throw new Error("No se pudieron obtener las películas");
    }
  }

  static async getUser({user}) {
    try {
      if(!user){
        throw new Error('user no proporcionado');
      }
      const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", user)
      .maybeSingle()

      if (error) {
        throw new Error("Error al obtener el usuario")
      }
      return data
    } catch (error) {
      console.error("Error en getUser:", error)
      throw new Error("No se pudo obtener el usuario")
    }
  }

  static async getMoviesFav({userId}){
    try {
      if(!userId){
        throw new Error('Id User no proporcionado')
      }

      const {data, error} = await supabase
      .from('movies')
      .select(`
        *,
        moviesFavs!inner (
          users!inner (
            id
          )
        )
      `)
      .eq('moviesFavs.users.id', userId)
      .maybeSingle()
      
      if(error){
        throw new Error("Error al obtener las peliculas favoritas")
      }

      return data
    } catch (error) {
      console.log("Error al consultar peliculas favoritas del userId",error);
      throw new Error("Error al consultar peliculas favoritas")
    }
  }

  static async getById({ id }) {
    try {
      if (!id) {
        throw new Error('ID no proporcionado');
      }

      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) {
        console.error('Error en getById:', error);
        resetSupabaseClient();
        throw new Error("Error al obtener la película");
      }
      
      return data;
    } catch (error) {
      console.error("Error en getById:", error);
      resetSupabaseClient();
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


  // Método para verificar la conexión
static async checkConnection() {
  try {
    const { data, error } = await supabase.from("movies").select("id").limit(1);
    if (error) {
      console.error('Error de conexión:', error);
      resetSupabaseClient();
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error al verificar conexión:', error);
    resetSupabaseClient();
    return false;
  }
  }
}

