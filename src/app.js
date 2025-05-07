import express from "express";
import cookieParser from "cookie-parser";
const app = express();

//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", authRouter);
app.use("/api/v1/projects", projectRouter);
export default app;
