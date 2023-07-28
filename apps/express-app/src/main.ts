import { generateData, rechartMonthlyData, rechartWeeklyData } from "@nx-visualize-app/shared";
import express from "express";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
// app.use(express.json());

app.get("/", (req, res) => {
	res.send({ message: "Hello API" });
});

app.get("/generate/week", (req, res) => {
	res.json(rechartWeeklyData(generateData(730)));
});
app.get("/generate/month", (req, res) => {
	res.json(rechartMonthlyData(generateData(730)));
});

app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
