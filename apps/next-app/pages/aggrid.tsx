import { AgChartExample } from "../components/AGGrid/AgChartExample";
import { App } from "../components/AGGrid/App";
import { ChartTypePicker } from "../components/AGGrid/ChartTypePicker";
import Link from "next/link";
import { useState, useEffect } from "react";

// import dynamic from "next/dynamic";

// const AgChartExampleClient = dynamic(() => Promise.resolve(AgChartExample), {
// 	ssr: false,
// });

export default function Home() {
	return (
		<div className="flex-row w-full bg-gradient-to-bl from-red-500 via-fuchsia-800 to-purple-500">
			<ChartTypePicker type={"aggrid"} />
			{/* <AgChartExample /> */}
		</div>
	);
}
