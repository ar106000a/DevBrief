import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth/index.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import protectedRoutes from "./routes/protectedRoutes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import helmet from "helmet";
import systemRoutes from "./routes/system/index.js";
import briefRouter from "./routes/brief/brief.js";
import path from "path";
import fileToPathUrl from "url";

export const app = express();
app.set("trust proxy", 1);

// Middleware
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow any origin when credentials: true by reflecting it back
//       callback(null, origin || "*");
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.get("/", (req, res) => res.status(200).send("OK"));

app.use("/api/auth", authRoute);

app.use("/system", systemRoutes);
app.use("/app", authenticateToken, protectedRoutes);
app.use("/app/brief", briefRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../DevBreif/dist")));

/* ---------------- REACT ROUTER SUPPORT ---------------- */

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../DevBreif/dist/index.html"));
});

app.use(errorHandler);

export default app;
