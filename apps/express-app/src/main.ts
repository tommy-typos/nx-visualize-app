import {
	generateData,
	rechartMonthlyData,
	rechartWeeklyData,
} from "@nx-visualize-app/shared";

import express from "express";
import { readFileSync } from "fs";
import cors from "cors";


const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());
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

app.get("/generate/week/samplecsv", (req, res) => {
	const data = readFileSync("sample.csv", { encoding: "utf-8" })
		.split("\n")
		.map((line) => line.split(","));
	res.json(data);
});

app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
