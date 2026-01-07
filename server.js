import "dotenv/config";
import express from "express";
import aiRouter from "./routes/api/ai.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

/* ===== Middleware ===== */
app.use(cors());
app.use(express.json());

/* ===== Request logger ===== */
app.use((req, res, next) => {
	const start = Date.now();

	res.on("finish", () => {
		const time = Date.now() - start;
		console.log(
			`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ` +
				`${res.statusCode} ${time}ms`
		);
	});

	next();
});

/* ===== Routes ===== */
app.use("/api/ai", aiRouter);

/* ===== 404 logger ===== */
app.use((req, res) => {
	console.warn(`[404] ${req.method} ${req.originalUrl}`);
	res.status(404).json({ message: "Not found" });
});

/* ===== Error logger ===== */
app.use((err, req, res, next) => {
	console.error(`[ERROR] ${req.method} ${req.originalUrl}`, err.message);
	res.status(500).json({ message: "Internal server error" });
});

/* ===== Start server ===== */
app.listen(PORT, () => {
	console.log(`🚀 Server started on port ${PORT} (${process.env.NODE_ENV || "development"})`);
});
