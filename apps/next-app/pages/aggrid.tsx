import { AgChartExample } from "../components/AGGridChart/AgChartExample";
import { ChartTypePicker } from "../components/ChartTypePicker";

// import dynamic from "next/dynamic";

// const AgChartExampleClient = dynamic(() => Promise.resolve(AgChartExample), {
// 	ssr: false,
// });

import React, { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RechartColumn } from "@nx-visualize-app/shared";
import { twColors } from "../utils/twTheme";
import { Controllers } from "../components/Controllers";
import { useDataStore } from "../zustand-store/store";

const cellStyles = {
	backgroundColor: twColors.fuchsia[700],
	color: "white",
};

export default function Home() {
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
		<div className="flex-row w-full bg-gradient-to-bl from-red-500 via-fuchsia-800 to-purple-500">
			<ChartTypePicker type={"aggrid"} />
			{/* <AgChartExample /> */}
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
				<Controllers
					aggregateBy={aggregateBy}
					setAggregateBy={setAggregateBy}
				/>
			</div>
		</div>
	);
}
