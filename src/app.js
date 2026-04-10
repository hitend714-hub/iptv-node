import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import routesLoader from "./loaders/routes.loader.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = ["http://localhost:4200", "http://localhost:3000"];

/* ---------------------- 1. Global Middlewares ---------------------- */
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

app.use(compression()); // Gzip compression
app.use(morgan("dev")); // Request logging

/* ---------------------- 2. Routes ---------------------- */
routesLoader(app);

/* ---------------------- 3. 404 Handler ---------------------- */
app.use(notFoundHandler);

/* ---------------------- 4. Global Error Handler ---------------------- */
app.use(errorHandler);

export default app;
