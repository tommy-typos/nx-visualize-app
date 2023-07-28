import Link from "next/link";
import classNames from "classnames";

export function ChartTypePicker({
	type,
}: {
	type: "recharts" | "aggrid" | null;
}) {
	return (
		<div className="bg-opacity-70 flex items-center justify-center my-6 bg-fuchsia-900 w-fit m-auto p-2 px-2 rounded-2xl">
			<Link
				href="/recharts"
				className={classNames(
					" text-teal-500 mr-3   rounded-2xl p-4 ",
					type === "recharts" && "bg-fuchsia-950 text-teal-300 "
				)}
			>
				<p className="hover:scale-105">{`<Recharts />`}</p>
			</Link>
			<Link
				href="/aggrid"
				className={classNames(
					" flex items-center text-white rounded-2xl p-4 px-5 group",
					type === "aggrid" && "bg-fuchsia-950 "
				)}
			>
				<div className="flex items-center group-hover:scale-105">
					<p className="mr-2 ">Ag Grid</p>
					<svg className="h-6 w-6 " viewBox="0 0 64 48">
						<style></style>
						<rect
							className="aqua right-1"
							x="51"
							y="10"
							width="7"
							height="8"
						></rect>
						<path
							className="aqua right-1"
							d="M58,10l-17,0l-8,8l25,0l0,-8Z"
						></path>
						<rect
							className="orange right-2"
							x="36"
							y="22"
							width="7"
							height="8"
						></rect>
						<path
							className="orange right-2"
							d="M43,30l0,-7.995l-14,-0l-8.008,7.995l22.008,0Z"
						></path>
						<rect
							className="red right-3"
							x="24"
							y="34"
							width="7"
							height="8"
						></rect>
						<path
							className="red right-3"
							d="M13,38.01l4,-4.01l14,0l0,8l-18,0l0,-3.99Z"
						></path>
						<rect
							className="grey left-1"
							x="11"
							y="6"
							width="7"
							height="8"
						></rect>
						<path
							className="grey left-1"
							d="M41,10l-4,4l-26,0l0,-8l30,0l0,4Z"
						></path>
						<rect
							className="grey left-2"
							x="16"
							y="18"
							width="7"
							height="8"
						></rect>
						<path
							className="grey left-2"
							d="M16,26l9,0l8,-8l-17,-0l0,8Z"
						></path>
						<rect
							className="grey left-3"
							x="6"
							y="30"
							width="7"
							height="8"
						></rect>
						<path
							className="grey left-3"
							d="M6,37.988l7,0.012l7.992,-8l-14.992,-0.047l-0,8.035Z"
						></path>
						<style>
							{`
								.aqua { fill: #55b4c8; }
								.orange { fill: #ff8c00; }
								.red { fill: #f00; }
								.grey { fill: #b4bebe; }
							`}
						</style>
					</svg>
				</div>
			</Link>
		</div>
	);
}
