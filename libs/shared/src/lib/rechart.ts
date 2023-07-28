import {
	DataRow,
	RechartColumn,
	Campaign,
	ContributionGroup,
	DateType,
} from "./types";

import {
	dateToString,
	addDaysToDate,
	randomDateString,
	getYearAndWeekNumber,
	getYearAndMonthName,
} from "./dateFunctions";

const campaignTypes: Campaign[] = [
	"Branded Broad",
	"Competitors Broad",
	"Generic Broad",
	"X_B | UK | Exact",
	"X_HT | UK | FLA | Exact",
	"X_LT | UK | Competitors | Exact",
];

const contributionGroupTypes: ContributionGroup[] = ["Media", "Non-Media"];

export const generateData = (numberOfDays: number): DataRow[] => {
	const dataRows: DataRow[] = [];

	const startingDate = new Date(randomDateString());

	for (let i = 0; i < numberOfDays; i++) {
		let mediaCount = 0;
		let nonMediaCount = 0;
		for (let j = 0; j < campaignTypes.length; j++) {
			let contributionGroup =
				contributionGroupTypes[Math.round(Math.random())];

			if (contributionGroup === "Media") mediaCount++;
			else nonMediaCount++;

			if (mediaCount > 3) {
				contributionGroup = "Non-Media";
			} else if (nonMediaCount > 3) {
				contributionGroup = "Media";
			}

			const dataRow: DataRow = {
				date: dateToString(addDaysToDate(startingDate, i)) as DateType,
				campaign: campaignTypes[j],
				channel: "PPC",
				contributionGroup: contributionGroup,
				cost: Math.round(Math.random() * 70),
				impressions: Math.round(Math.random() * 10_000),
			};

			dataRows.push(dataRow);
		}
	}

	return dataRows;
};

export function rechartWeeklyData(data: DataRow[]): RechartColumn[] {
	const rechartColumns: RechartColumn[] = [];

	let currentWeek = getYearAndWeekNumber(new Date(data[0].date));

	let column: RechartColumn = {
		name: `${currentWeek.year}, Week ${currentWeek.weekNo}`,
		media_totalCost:
			data[0].contributionGroup === "Media" ? data[0].cost : 0,
		nonMedia_totalCost:
			data[0].contributionGroup === "Non-Media" ? data[0].cost : 0,
		impressionCount: data[0].impressions,
	};

	for (let i = 1; i < data.length; i++) {
		const week = getYearAndWeekNumber(new Date(data[i].date));

		if (
			currentWeek.year === week.year &&
			currentWeek.weekNo === week.weekNo
		) {
			// week continues
			column.impressionCount =
				column.impressionCount + data[i].impressions;

			if (data[i].contributionGroup === "Media") {
				column.media_totalCost = column.media_totalCost + data[i].cost;
			} else {
				column.nonMedia_totalCost =
					column.nonMedia_totalCost + data[i].cost;
			}
		} else {
			// new week

			// save old week
			rechartColumns.push(column);

			// change current to new week
			currentWeek = week;

			column = {
				name: `${currentWeek.year}, Week ${currentWeek.weekNo}`,
				media_totalCost:
					data[i].contributionGroup === "Media" ? data[0].cost : 0,
				nonMedia_totalCost:
					data[i].contributionGroup === "Non-Media"
						? data[0].cost
						: 0,
				impressionCount: data[i].impressions,
			};
		}
	}

	// adding very last week column too
	rechartColumns.push(column);

	return rechartColumns;
}

export function rechartMonthlyData(data: DataRow[]): RechartColumn[] {
	const rechartColumns: RechartColumn[] = [];

	let currentMonth = getYearAndMonthName(new Date(data[0].date));

	let column: RechartColumn = {
		name: `${currentMonth.year}, ${currentMonth.monthName}`,
		media_totalCost:
			data[0].contributionGroup === "Media" ? data[0].cost : 0,
		nonMedia_totalCost:
			data[0].contributionGroup === "Non-Media" ? data[0].cost : 0,
		impressionCount: data[0].impressions,
	};

	for (let i = 1; i < data.length; i++) {
		const month = getYearAndMonthName(new Date(data[i].date));

		if (
			currentMonth.year === month.year &&
			currentMonth.monthName === month.monthName
		) {
			// month continues
			column.impressionCount =
				column.impressionCount + data[i].impressions;

			if (data[i].contributionGroup === "Media") {
				column.media_totalCost = column.media_totalCost + data[i].cost;
			} else {
				column.nonMedia_totalCost =
					column.nonMedia_totalCost + data[i].cost;
			}
		} else {
			// new month

			// save old month
			rechartColumns.push(column);

			// change current to new month
			currentMonth = month;

			column = {
				name: `${currentMonth.year}, ${currentMonth.monthName}`,
				media_totalCost:
					data[i].contributionGroup === "Media" ? data[0].cost : 0,
				nonMedia_totalCost:
					data[i].contributionGroup === "Non-Media"
						? data[0].cost
						: 0,
				impressionCount: data[i].impressions,
			};
		}
	}

	// adding very last month column too
	rechartColumns.push(column);

	return rechartColumns;
}
