import cors from "cors";
import jwt from "jsonwebtoken";

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
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "No autorizado. Falta el token." });
  }

  try {
    const decodetk = jwt.verify(token, JWT_SECRET);
    req.user = decodetk; //
    next(); //sigue al siguiente handler
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};
