import {
	DataRow,
	RechartColumn,
	rechartMonthlyData,
	rechartWeeklyData,
} from "@nx-visualize-app/shared";
import { create } from "zustand";
import { generateData } from "@nx-visualize-app/shared";

type DataStore = {
	rawData: DataRow[] | null;
	weekData: RechartColumn[] | null;
	monthData: RechartColumn[] | null;
	setRawAndWeekData: (data?: DataRow[]) => void;
	setMonthData: () => void;
};

export const useDataStore = create<DataStore>()((set) => ({
	rawData: null,
	weekData: null,
	monthData: null,
	setRawAndWeekData: (data) =>
		set((state) => {
			const raw = data === undefined ? generateData(730) : data;
			const week = rechartWeeklyData(raw);
			// const month = rechartMonthlyData(raw);

			return {
				rawData: raw,
				weekData: week,
				monthData: null,
			};
		}),
	setMonthData: () =>
		set((state) => {
			let month;
			if (state.monthData === null) {
				month = rechartMonthlyData(state.rawData as DataRow[]);
			}
			return {
				monthData: state.monthData === null ? month : state.monthData,
			};
		}),
}));
