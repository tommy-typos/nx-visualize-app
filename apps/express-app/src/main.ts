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

app.get("/generate", (req, res) => {
	res.json(generateData(730));
});

app.get("/samplecsv", (req, res) => {
	try {
		const data = readFileSync("sample.csv", { encoding: "utf-8" })
			.split("\n")
			.map((line) => line.split(","));
		res.json(data);
	} catch (e) {
		res.status(500).json({ errorMessage: "Couldn't read file" });
	}
});

app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
