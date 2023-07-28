import { ChartTypePicker } from "../components/ChartTypePicker";

import { Pagination } from "../components/Pagination";
import { RechartColumn } from "@nx-visualize-app/shared";
import { twColors } from "../utils/twTheme";
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

import React, { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const cellStyles = {
	backgroundColor: twColors.fuchsia[700],
	color: "white",
};

export function Index() {
	const gridRef = useRef<any>();

	const [columnDefs, setColumnDefs] = useState([
		{
			field: "name",
			headerName: "Week",
			cellStyle: { ...cellStyles },
		},
		{
			field: "media_totalCost",
			headerName: "Media's Total Cost",
			cellStyle: {
				...cellStyles,
				// textAlign: "center"
			},
		},
		{
			field: "nonMedia_totalCost",
			headerName: "Non-Media's Total Cost",
			cellStyle: {
				...cellStyles,
				// textAlign: "center"
			},
		},
		{
			field: "impressionCount",
			headerName: "Impressions",
			cellStyle: {
				...cellStyles,
				// textAlign: "center"
			},
		},
	]);

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
		}),
		[]
	);

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
			if (columnDefs[0].headerName !== "Week") {
				setColumnDefs((defs) => {
					return [
						{
							...defs[0],
							headerName: "Week",
						},
						...defs.slice(1),
					];
				});
			}
		} else {
			setData(monthData ?? []);
			if (columnDefs[0].headerName !== "Month") {
				setColumnDefs((defs) => {
					return [
						{
							...defs[0],
							headerName: "Month",
						},
						...defs.slice(1),
					];
				});
			}
		}
	}, [aggregateBy, weekData, monthData]);
	return (
		<div className="flex-row w-full  bg-gradient-to-bl from-red-500 via-fuchsia-800 to-purple-500">
			<ChartTypePicker type={null} />
			{/* <div className="text-white text-center mt-32 text-6xl">
				Choose either Recharts or AG Grid
			</div> */}
			<div className="flex items-center justify-center  m-auto mt-4 gap-4 mb-5">
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
			<ResponsiveContainer className="!h-[500px] !w-4/5 m-auto max-w-4xl mb-5">
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
			<div className=" !w-4/5 m-auto flex flex-col items-center justify-center">
				<div
					className="ag-theme-alpine "
					style={{
						width: 818,
						height: 500,
						marginBottom: "20px",
					}}
				>
					<AgGridReact
						containerStyle={{}}
						className=""
						ref={gridRef as any}
						rowData={data}
						columnDefs={columnDefs as any}
						defaultColDef={defaultColDef}
						animateRows={true}
						rowSelection="multiple"
					/>
				</div>
			</div>
		</div>
	);
}

export default Index;
