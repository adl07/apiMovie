import cors from "cors";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("ADVERTENCIA: La variable de entorno JWT_SECRET no está configurada!");
}
const allowedOrigins = [
  "http://localhost:5173",
  "https://api-movie-front.vercel.app"
];

export const corsMiddleware = cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Origen rechazado:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,

});



export const verifyToken = (req, res, next) => {
  // Omitir verificación de token para peticiones OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return next();
  }

  /*const token = req.cookies.access_token || 
  (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  */

  // Verificar token en cookies
  const cookieToken = req.cookies.access_token;
  
  // Verificar token en header Authorization
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.split(" ")[1];
  
  // Usar cualquiera de los dos tokens
  const token = cookieToken || headerToken;

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
