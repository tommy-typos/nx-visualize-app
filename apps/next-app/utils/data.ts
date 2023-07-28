type DateType = `${number}-${number}-${number}`;

type Campaign =
	| "Branded Broad"
	| "Competitors Broad"
	| "Generic Broad"
	| "X_B | UK | Exact"
	| "X_HT | UK | FLA | Exact"
	| "X_LT | UK | Competitors | Exact";

type Channel = "PPC";

type ContributionGroup = "Media" | "Non-Media";

const campaignTypes: Campaign[] = [
	"Branded Broad",
	"Competitors Broad",
	"Generic Broad",
	"X_B | UK | Exact",
	"X_HT | UK | FLA | Exact",
	"X_LT | UK | Competitors | Exact",
];

const contributionGroupTypes: ContributionGroup[] = ["Media", "Non-Media"];

//string to date => new Date("yyyy-mm-dd") mm starts from 1 or 01.
//string to date => new Date(yearNum, monthNum, dayNum) monthNum starts from 0 or 00.

function dateToString(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${year}-${month}-${day}`;
}

function addDaysToDate(date: Date, numOfDays: number) {
	const day = 60 * 60 * 24 * 1000;
	return new Date(date.getTime() + day * numOfDays);
}

// Math.round(Math.random() * 5) => 0, 1, 2, 3, 4, 5

function randomDateString() {
	const year = 1984 + Math.round(Math.random() * 40);
	const month = Math.round(Math.random() * 11) + 1;
	const day = Math.round(Math.random() * 27) + 1;
	return `${year}-${month}-${day}`;
}

function getYearAndWeekNumber(d: Date) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

	return {
		year: d.getUTCFullYear(),
		weekNo: weekNo,
	};
}

export type DataRow = {
	date: DateType;
	campaign: Campaign;
	channel: Channel;
	contributionGroup: ContributionGroup;
	cost: number;
	impressions: number;
};

export const generateData = (numberOfDays: number): DataRow[] => {
	const dataRows: DataRow[] = [];

	const startingDate = new Date(randomDateString());

	for (let i = 0; i < numberOfDays; i++) {
		let mediaCount = 0;
		let nonMediaCount = 0;
		for (let j = 0; j < campaignTypes.length; j++) {
			let contributionGroup = contributionGroupTypes[Math.round(Math.random())];

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

/**
 * rechart data structure
 *
 * columnName: 2023, Week 30
 * mediaTotalCost: number
 * nonMediatotalcost: number
 * weeklyimpressioncount
 */

export type RechartColumn = {
	name: `${number}, Week ${number}` | `${number}, ${string}`;
	media_totalCost: number;
	nonMedia_totalCost: number;
	impressionCount: number;
};

export function rechartWeeklyData(data: DataRow[]): RechartColumn[] {
	const rechartColumns: RechartColumn[] = [];

	let currentWeek = getYearAndWeekNumber(new Date(data[0].date));

	let column: RechartColumn = {
		name: `${currentWeek.year}, Week ${currentWeek.weekNo}`,
		media_totalCost: data[0].contributionGroup === "Media" ? data[0].cost : 0,
		nonMedia_totalCost: data[0].contributionGroup === "Non-Media" ? data[0].cost : 0,
		impressionCount: data[0].impressions,
	};

	for (let i = 1; i < data.length; i++) {
		const week = getYearAndWeekNumber(new Date(data[i].date));

		if (currentWeek.year === week.year && currentWeek.weekNo === week.weekNo) {
			// week continues
			column.impressionCount = column.impressionCount + data[i].impressions;

			if (data[i].contributionGroup === "Media") {
				column.media_totalCost = column.media_totalCost + data[i].cost;
			} else {
				column.nonMedia_totalCost = column.nonMedia_totalCost + data[i].cost;
			}
		} else {
			// new week

			// save old week
			rechartColumns.push(column);

			// change current to new week
			currentWeek = week;

			column = {
				name: `${currentWeek.year}, Week ${currentWeek.weekNo}`,
				media_totalCost: data[i].contributionGroup === "Media" ? data[0].cost : 0,
				nonMedia_totalCost: data[i].contributionGroup === "Non-Media" ? data[0].cost : 0,
				impressionCount: data[i].impressions,
			};
		}
	}

	// adding very last week column too
	rechartColumns.push(column);

	return rechartColumns;
}

function getYearAndMonthName(d: Date) {
	return {
		year: d.getFullYear(),
		monthName: new Date(d).toLocaleString("default", { month: "long" }),
	};
}

export function rechartMonthlyData(data: DataRow[]): RechartColumn[] {
	const rechartColumns: RechartColumn[] = [];

	let currentMonth = getYearAndMonthName(new Date(data[0].date));

	let column: RechartColumn = {
		name: `${currentMonth.year}, ${currentMonth.monthName}`,
		media_totalCost: data[0].contributionGroup === "Media" ? data[0].cost : 0,
		nonMedia_totalCost: data[0].contributionGroup === "Non-Media" ? data[0].cost : 0,
		impressionCount: data[0].impressions,
	};

	for (let i = 1; i < data.length; i++) {
		const month = getYearAndMonthName(new Date(data[i].date))

		if (currentMonth.year === month.year && currentMonth.monthName === month.monthName) {
			// month continues
			column.impressionCount = column.impressionCount + data[i].impressions;

			if (data[i].contributionGroup === "Media") {
				column.media_totalCost = column.media_totalCost + data[i].cost;
			} else {
				column.nonMedia_totalCost = column.nonMedia_totalCost + data[i].cost;
			}
		} else {
			// new month

			// save old month
			rechartColumns.push(column);

			// change current to new month
			currentMonth = month;

			column = {
				name: `${currentMonth.year}, ${currentMonth.monthName}`,
				media_totalCost: data[i].contributionGroup === "Media" ? data[0].cost : 0,
				nonMedia_totalCost: data[i].contributionGroup === "Non-Media" ? data[0].cost : 0,
				impressionCount: data[i].impressions,
			};
		}
	}

	// adding very last month column too
	rechartColumns.push(column);

	return rechartColumns;
}
