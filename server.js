import "dotenv/config";
import express from "express";
import aiRouter from "./routes/api/ai.js";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/ai", aiRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
