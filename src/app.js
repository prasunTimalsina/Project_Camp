import express from "express";
const app = express();

app.use(express.urlencoded());
app.use(express.json());

export default app;
