import classNames from "classnames";
import { useDataStore } from "../zustand-store/store";
import { useState } from "react";

export function Controllers({
	aggregateBy,
	setAggregateBy,
}: {
	aggregateBy: "week" | "month";
	setAggregateBy: React.Dispatch<React.SetStateAction<"week" | "month">>;
}) {
	const setRawAndWeekData = useDataStore((state) => state.setRawAndWeekData);
	const setMonthData = useDataStore((state) => state.setMonthData);

	function generateHandler() {
		setRawAndWeekData();
	}

	function aggregateTypeHandler(passedType: "week" | "month") {
		setAggregateBy(passedType);
		if (!(passedType === aggregateBy)) {
			if (passedType === "month") {
				setMonthData();
			}
		}
	}

	const [serverOn, setServerOn] = useState(true);

	function serverDataHandler() {
		fetch("http://localhost:3000/generate")
			.then((result) => result.json())
			.then((data) => {
				setRawAndWeekData(data);
			})
			.catch((e) => {
				console.log("Error happened");
				setServerOn(false);
			});
	}

	return (
		<div className="flex justify-center items-center gap-4 ">
			<button
				onClick={serverDataHandler}
				className="p-4 px-4 bg-fuchsia-900 bg-opacity-70 text-white rounded-2xl hover:bg-fuchsia-950 disabled:pointer-events-none disabled:opacity-50"
				disabled={!serverOn}
			>
				<p>{serverOn ? "Get server data" : "Server is offline"}</p>
			</button>

			<button
				onClick={generateHandler}
				className="p-4 px-4 bg-fuchsia-900 bg-opacity-70 text-white rounded-2xl hover:bg-fuchsia-950"
			>
				Generate locally
			</button>
			<div className=" flex justify-center items-center bg-fuchsia-900 w-fit m-auto p-2 px-4 rounded-2xl bg-opacity-70">
				<p className="text-white  p-2 text-center select-none opacity-80 hidden md:block">
					Aggregate by
				</p>
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
	);
}
