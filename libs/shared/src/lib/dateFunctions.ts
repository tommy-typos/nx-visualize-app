//string to date => new Date("yyyy-mm-dd") mm starts from 1 or 01.
//string to date => new Date(yearNum, monthNum, dayNum) monthNum starts from 0 or 00.

export function dateToString(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${year}-${month}-${day}`;
}

export function addDaysToDate(date: Date, numOfDays: number) {
	const day = 60 * 60 * 24 * 1000;
	return new Date(date.getTime() + day * numOfDays);
}

// Math.round(Math.random() * 5) => 0, 1, 2, 3, 4, 5

export function randomDateString() {
	const year = 1984 + Math.round(Math.random() * 40);
	const month = Math.round(Math.random() * 11) + 1;
	const day = Math.round(Math.random() * 27) + 1;
	return `${year}-${month}-${day}`;
}

export function getYearAndWeekNumber(d: Date) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(
		((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
	);

	return {
		year: d.getUTCFullYear(),
		weekNo: weekNo,
	};
}

export function getYearAndMonthName(d: Date) {
	return {
		year: d.getFullYear(),
		monthName: new Date(d).toLocaleString("default", { month: "long" }),
	};
}
