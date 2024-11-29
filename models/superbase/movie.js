import { createClient } from "@supabase/supabase-js";

// Inicializa el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export class MovieModel {
  static async getAll({ genre }) {
    try {
      let query = supabase.from("movie").select("*");
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
        .from("movie")
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
        .from("movie")
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
      const { error } = await supabase.from("movie").delete().eq("id", id);
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
        .from("movie")
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

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from("movie")
      .select("count", { count: "exact" });
    if (error) throw error;
    console.log("Conexión a Supabase exitosa");
    return true;
  } catch (error) {
    console.error("Falló la conexión a Supabase:", error);
    return false;
  }
}