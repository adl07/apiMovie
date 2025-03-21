import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"; 

dotenv.config();

// Inicializa el cliente de Supabase con mejor manejo de errores
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Las variables de entorno de Supabase no están configuradas correctamente"
  );
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

      const { data: tableInfo, error: tableError } = await supabase
        .from("movies")
        .select("*")
        .limit(1);

      if (tableError) {
        console.error(
          "Error al verificar la estructura de la tabla:",
          tableError
        );
        throw new Error("Error al acceder a la base de datos");
      }

      // Si se proporciona género y la columna existe, aplicar el filtro
      if (genre && tableInfo && tableInfo[0] && "genre" in tableInfo[0]) {
        query = query.eq("genre", genre.toUpperCase());
      } else if (genre) {
        console.warn("La columna genre no existe en la tabla movies");
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error en getAll:", error);
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

  static async getUser({ user }) {
    try {
      if (!user) {
        throw new Error("user no proporcionado");
      }
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", user)
        .maybeSingle();

      if (error) {
        throw new Error("Error al obtener el usuario");
      }
      return data;
    } catch (error) {
      console.error("Error en getUser:", error);
      throw new Error("No se pudo obtener el usuario");
    }
  }

  static async getMoviesFav({ userId }) {
    try {
      if (!userId) {
        throw new Error("User ID not provided");
      }

      console.log("[DEBUG] Iniciando consulta para userId:", userId);

      // Obtener las películas favoritas del usuario
      const { data: favMovies, error: favError } = await supabase
        .from("moviesfavs")
        .select("idmovie, favs")
        .eq("iduser", userId)
        .eq("favs", true)
        .is("fecbaja", null); // Validación para que fecBaja sea NULL

      if (favError) {
        console.error("[DEBUG] Error al obtener moviesFavs:", favError);
        throw favError;
      }

      if (!favMovies || favMovies.length === 0) {
        console.log("[DEBUG] No se encontraron películas favoritas");
        return [];
      }

      // Extraer los IDs de las películas
      const movieIds = favMovies.map((fav) => fav.idmovie);
      const favsState = favMovies.map((state)=> state.favs)
      console.log("[DEBUG] IDs de películas favoritas:", movieIds);
      console.log("[DEBUG] favs de películas favoritas:", favsState)

      // Obtener los detalles de las películas
      const { data: movies, error: moviesError } = await supabase
        .from("movies")
        .select(`
          *,
          favs:moviesfavs(favs)
        `)
        .in("id", movieIds)
        .eq("moviesfavs.iduser", userId)
        .eq("moviesfavs.favs",true)

      if (moviesError) {
        console.error("[DEBUG] Error al obtener movies:", moviesError);
        throw moviesError;
      }

      console.log("[DEBUG] Películas encontradas:", movies?.length || 0);
      return movies || [];
    } catch (error) {
      console.error("[DEBUG] Error completo:", error);
      throw error;
    }
  }

  static async addMovieList({ idUser, idMovie }) {
    try {
      console.log("[DEBUG] Recibiendo parámetros:", { idUser, idMovie });
      if (!idUser || !idMovie) {
        console.error("[DEBUG] Faltan parámetros:", { idUser, idMovie });
        throw new Error("Se requieren idUser e idMovie");
      }

      //Verifico si la película ya esta en favoritos
      const { data: existingMovie, error: fetchError } = await supabase
      .from("moviesfavs")
      .select("*")
      .eq("iduser", idUser)
      .eq("idmovie", idMovie)
      .is("fecbaja", null) 
      .eq("favs", true); 

      if (fetchError) {
          console.error("[DEBUG] Error al buscar la película:", fetchError);
          throw fetchError;
      }

      //Si ya existe no la agrego
      if (existingMovie.length > 0) {
          console.log("[DEBUG] La película ya está en la lista de favoritos. No se agregará.");
          return false
      }

      //Si no existe se agrega
      const { data, error } = await supabase
        .from("moviesfavs")
        .insert([{ iduser: idUser, idmovie: idMovie }])
        .select();

      if (error) {
        console.error("[DEBUG] Error de Supabase:", error);
        throw error;
      }

      console.log("[DEBUG] Película agregada exitosamente:", data);

      return data[0];
    } catch (error) {
      console.log("Error al agregar pelicula a la lista", error);
      throw new Error("No se pudo agregar pelicula a la lista");
    }

  }

  static async updateMovieList({idUser, idMovie}){
    try {
      if(!idUser || !idMovie){
        console.log("[DEBUG] Parámetros incorrectos:", { idUser, idMovie });
        throw new Error("Error al enviar los parámetros");
      }
  
      // Actualización directa sin verificación previa
      const { data, error } = await supabase
        .from("moviesfavs")
        .update({ favs: false,
                  fecbaja: new Date() // Asigna la fecha y hora actual en formato timestamp
        })
        .eq('iduser', idUser)
        .eq('idmovie', idMovie)
        .select()
  
      if(error){
        console.error("[DEBUG] Error de Supabase:", error);
        throw error;
      }
  
      if(!data) {
        console.log("[DEBUG] No se encontró el registro para actualizar");
        throw new Error("Registro no encontrado");
      }
  
      console.log("[DEBUG] Registro actualizado:", data);
      return data;
  
    } catch (error) {
      console.error("[DEBUG] Error completo:", error);
      throw new Error("No se pudo modificar la película de la lista");
    }
  }
  
  static async getById({ id }) {
    try {
      if (!id) {
        throw new Error("ID no proporcionado");
      }

      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error en getById:", error);
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


  static async createUser({input}){
    const {username, email, password, subscripcion} = input
    try {
      const {data, error} = await supabase
        .from("users")
        .insert([{username, email, password, subscripcion}])
        .select();
        if(error) throw error;
        return data[0]
    } catch (error) {
      console.error("Error al crear el usuario",error)
      throw Error("No se pudo crear el usuario")
      
    }
  }
    


  // Método para verificar la conexión
  static async checkConnection() {
    try {
      const { data, error } = await supabase
        .from("movies")
        .select("id")
        .limit(1);
      if (error) {
        console.error("Error de conexión:", error);
        resetSupabaseClient();
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error al verificar conexión:", error);
      resetSupabaseClient();
      return false;
    }
  }
}
