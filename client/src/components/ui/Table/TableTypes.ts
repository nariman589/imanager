export type filterType = "Date" | "Filter" | undefined;

export interface THeaderProps {
	name: string;
	filterType?: filterType;
}

export interface TBodyProps {
	values: TBodyValues[];
	item?: any;
	link?: string;
	guid?: string;
	isOpened?: boolean;
	isArchive?: boolean;
}

export interface TBodyValues {
	name: string;
	type?: "Date";
}
