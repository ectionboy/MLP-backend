import "dotenv/config";
import express from "express";
import aiRouter from "./routes/api/ai.js";

const app = express();

app.use(express.json());

app.use("/api/ai", aiRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
