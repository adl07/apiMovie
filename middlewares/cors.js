import cors from "cors";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("ADVERTENCIA: La variable de entorno JWT_SECRET no está configurada!");
}

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      "http://localhost:8080",
      "http://localhost:1234",
      "http://localhost:5173",
      "http://movies.com",
    ];

    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, origin);
    }else {
      console.log(`Origen ${origin} no permitido por CORS`);
      callback(new Error("No permitido por CORS"));
    }

  },
  methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400, // 24 horas - cachear resultados de preflight por 1 día

});



export const verifyToken = (req, res, next) => {
  // Omitir verificación de token para peticiones OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return next();
  }

  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "No autorizado. Falta el token." });
  }

  try {
    const decodetk = jwt.verify(token, JWT_SECRET);
    req.user = decodetk; //
    next(); //sigue al siguiente handler
  } catch (error) {
    console.error("Error de verificación de token:", error.message);
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};
