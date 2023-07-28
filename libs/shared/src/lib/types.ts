export type DateType = `${number}-${number}-${number}`;

export type Campaign =
	| "Branded Broad"
	| "Competitors Broad"
	| "Generic Broad"
	| "X_B | UK | Exact"
	| "X_HT | UK | FLA | Exact"
	| "X_LT | UK | Competitors | Exact";

type Channel = "PPC";

export type ContributionGroup = "Media" | "Non-Media";

export type DataRow = {
	date: DateType;
	campaign: Campaign;
	channel: Channel;
	contributionGroup: ContributionGroup;
	cost: number;
	impressions: number;
};

export type RechartColumn = {
	name: `${number}, Week ${number}` | `${number}, ${string}`;
	media_totalCost: number;
	nonMedia_totalCost: number;
	impressionCount: number;
};
