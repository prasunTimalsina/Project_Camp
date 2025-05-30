import express from "express";
import cookieParser from "cookie-parser";
const app = express();

//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import noteRouter from "./routes/note.routes.js";
import taskRouter from "./routes/task.routes.js";
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/projects/:projectId/notes", noteRouter);
app.use("/api/v1/projects/:projectId/tasks", taskRouter);
export default app;
