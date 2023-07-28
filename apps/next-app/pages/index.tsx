import { ChartTypePicker } from "../components/ChartTypePicker";

export function Index() {
	return (
		<div className="flex-row w-full bg-gradient-to-bl from-red-500 via-fuchsia-800 to-purple-500">
			<ChartTypePicker type={null} />
			<div className="text-white text-center mt-32 text-6xl">
				Choose either Recharts or AG Grid
			</div>
		</div>
	);
}

export default Index;
