export function shared(): string {
	return "shared";
}

export { generateData, rechartMonthlyData, rechartWeeklyData } from "./rechart";
export type { DataRow, RechartColumn } from "./types";
