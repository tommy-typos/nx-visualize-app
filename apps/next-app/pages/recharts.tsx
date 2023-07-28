import { App } from "../components/AGGrid/App";
import { ChartTypePicker } from "../components/AGGrid/ChartTypePicker";
import { Pagination } from "../components/AGGrid/Pagination";
import { DataRow, RechartColumn, generateData, rechartMonthlyData, rechartWeeklyData  } from "../utils/data";
import { twColors } from "../utils/twTheme";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";

import React, { PureComponent } from "react";
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
} from "recharts";

export default function Home() {
	const [page, setPage] = useState(1);
	const [aggregateBy, setAggregateBy] = useState<"week" | "month">("week");
	const numOfPages = 10;
	const [raw, setRaw] = useState<DataRow[]>([] as DataRow[]);
	const [data, setData] = useState<RechartColumn[]>([] as RechartColumn[]);

	useEffect(() => {
		setData(rechartWeeklyData(generateData(730)));
		setPage(1);
	}, []);

	function generateHandler() {
		// console.log(rechartWeeklyData(generateData(730)));
		setData(rechartWeeklyData(generateData(730)));
		setPage(1);
	}

	function aggregateTypeHandler(passedType: "week" | "month") {
		setAggregateBy(passedType);
		// TODO: this shouldn't block operations (usedeferred value needed i guess)
		setTimeout(() => {
			if (passedType === aggregateBy) {
				// do nothing
			} else {
				if (passedType === "week") {
					setData(rechartWeeklyData(generateData(730)));
					setPage(1);
				} else {
					setData(rechartMonthlyData(generateData(730)));
					setPage(1);
				}
			}
		}, 0);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	function uploadHandler() {}

	return (
		<div className="flex-row   w-full bg-gradient-to-bl from-red-500 via-fuchsia-800 to-purple-500">
			<ChartTypePicker type={"recharts"} />

			<ResponsiveContainer className="!h-2/3 !w-4/5 m-auto">
				<ComposedChart width={500} height={400} data={data.slice((page - 1) * 5, (page - 1) * 5 + 5)}>
					<CartesianGrid stroke="white" />
					<XAxis
						stroke="white"
						strokeWidth={3}
						dataKey="name"
						label={{ value: "Weeks", position: "insideBottomRight", offset: 0, fill: "white" }}
						// scale="band"
					/>
					<YAxis
						yAxisId="forbar"
						stroke="white"
						strokeWidth={3}
						label={{ value: "Weekly Total Cost", angle: -90, position: "insideLeft", fill: "white" }}
					/>
					<YAxis
						yAxisId="forline"
						orientation="right"
						stroke="white"
						strokeWidth={3}
						label={{ value: "Impression Count", angle: -90, position: "insideRight", fill: "white" }}
					/>
					<Tooltip />
					<Legend />
					<Bar
						yAxisId="forbar"
						dataKey="media_totalCost"
						name="Media's Total Cost"
						barSize={20}
						fill={twColors.blue[500]}
					/>
					<Bar
						yAxisId="forbar"
						dataKey="nonMedia_totalCost"
						name="Non-Media's Total Cost"
						barSize={20}
						fill={twColors.orange[500]}
					/>
					<Line
						yAxisId="forline"
						type="monotone"
						dataKey="impressionCount"
						name="Impression Count"
						stroke={twColors.fuchsia[950]}
						strokeWidth={3}
					/>
				</ComposedChart>
			</ResponsiveContainer>
			<div className="flex items-center justify-end !w-4/5 m-auto mt-4 gap-4">
				<div className="flex justify-center items-center gap-4 ">
					<button
						onClick={uploadHandler}
						className="p-4 px-4 bg-fuchsia-900 bg-opacity-70 text-white rounded-2xl hover:bg-fuchsia-950"
					>
						<p>Upload your file</p>
					</button>

					<button
						onClick={generateHandler}
						className="p-4 px-4 bg-fuchsia-900 bg-opacity-70 text-white rounded-2xl hover:bg-fuchsia-950"
					>
						Generate random data
					</button>
					<div className=" flex justify-center items-center bg-fuchsia-900 w-fit m-auto p-2 px-4 rounded-2xl bg-opacity-70">
						<p className="text-white  p-2 text-center select-none opacity-80">Aggregate by</p>
						<button
							onClick={() => aggregateTypeHandler("week")}
							className={classNames(
								" text-white flex hover:scale-105 px-3  p-2",
								aggregateBy === "week" && "bg-fuchsia-950 rounded-2xl"
							)}
						>
							Week
						</button>
						<button
							onClick={() => aggregateTypeHandler("month")}
							className={classNames(
								" text-white flex items-center hover:scale-105 px-3  p-2",
								aggregateBy === "month" && "bg-fuchsia-950 rounded-2xl"
							)}
						>
							Month
						</button>
					</div>
				</div>
				<Pagination page={page} setPage={setPage} numOfPages={Math.ceil(data.length / 5)} />
			</div>
		</div>
	);
}
