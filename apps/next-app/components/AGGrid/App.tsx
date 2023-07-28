import { generateData, rechartWeeklyData } from "@nx-visualize-app/shared";
import { useEffect, useState } from "react";
export function App() {
	const [toggle, setToggle] = useState(false);
	useEffect(() => {
		// for (let i = 0; i < 100; i++) {
		// console.log(Math.round(Math.random() * 5));
		// }
	}, [toggle]);
	return (
		<button
			className="border-2 p-5"
			onClick={() => {
				setToggle((value) => !value);
				// console.log(JSON.stringify(sample.map(obj => {
				// 	return {
				// 		date: obj.date,
				// 		contributionGroup: obj.contributionGroup,
				// 		cost: obj.cost,
				// 		impressions: obj.impressions
				// 	}
				// }), null, 2));
				console.log(rechartWeeklyData(generateData(730)));
				// console.log(JSON.stringify(rechartWeeklyData(sample), null, 2));
			}}
		>
			toggle
		</button>
	);
}
