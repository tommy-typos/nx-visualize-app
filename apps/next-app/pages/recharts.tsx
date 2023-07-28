import { ChartTypePicker } from "../components/ChartTypePicker";
import { Pagination } from "../components/Pagination";
import { RechartColumn } from "@nx-visualize-app/shared";
import { twColors } from "../utils/twTheme";
import { useEffect, useState } from "react";
import {
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useDataStore } from "../zustand-store/store";
import { Controllers } from "../components/Controllers";

export default function Home() {
	const weekData = useDataStore((state) => state.weekData);
	const monthData = useDataStore((state) => state.monthData);
	const setRawAndWeekData = useDataStore((state) => state.setRawAndWeekData);

	const [data, setData] = useState<RechartColumn[]>([] as RechartColumn[]);

	const [page, setPage] = useState(1);
	const [aggregateBy, setAggregateBy] = useState<"week" | "month">("week");

	useEffect(() => {
		if (weekData === null) {
			setRawAndWeekData();
		}
	}, []);

	useEffect(() => {
		setAggregateBy("week");
	}, [weekData]);

	useEffect(() => {
		if (aggregateBy === "week") {
			setData(weekData ?? []);
		} else {
			setData(monthData ?? []);
		}
	}, [aggregateBy, weekData, monthData]);

	return (
		<div className="flex-row   w-full bg-gradient-to-bl from-red-500 via-fuchsia-800 to-purple-500">
			<ChartTypePicker type={"recharts"} />

			<ResponsiveContainer className="!h-2/3 !w-4/5 m-auto max-w-4xl">
				<ComposedChart
					width={500}
					height={400}
					data={data.slice((page - 1) * 5, (page - 1) * 5 + 5)}
				>
					<CartesianGrid stroke="white" />
					<XAxis
						stroke="white"
						strokeWidth={3}
						dataKey="name"
						label={{
							value: "Weeks",
							position: "insideBottomRight",
							offset: 0,
							fill: "white",
						}}
						// scale="band"
					/>
					<YAxis
						yAxisId="forbar"
						stroke="white"
						strokeWidth={3}
						label={{
							value: "Weekly Total Cost",
							angle: -90,
							position: "insideLeft",
							fill: "white",
						}}
					/>
					<YAxis
						yAxisId="forline"
						orientation="right"
						stroke="white"
						strokeWidth={3}
						label={{
							value: "Impressions",
							angle: -90,
							position: "insideRight",
							fill: "white",
						}}
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
						name="Impressions"
						stroke={twColors.fuchsia[950]}
						strokeWidth={3}
					/>
				</ComposedChart>
			</ResponsiveContainer>
			<div className="flex items-center justify-center  m-auto mt-4 gap-4">
				<Controllers
					aggregateBy={aggregateBy}
					setAggregateBy={setAggregateBy}
				/>
				<Pagination
					page={page}
					setPage={setPage}
					numOfPages={Math.ceil(data.length / 5)}
				/>
			</div>
		</div>
	);
}
