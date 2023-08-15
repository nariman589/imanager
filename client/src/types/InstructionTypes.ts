export interface InstructionList {
	instructionId?: number;
	instructionName?: string;
	instructionBranch?: string;
	instructionUrl?: string;
	whoAdded?: string;
	whenAdded?: string;
	whoChanged?: string;
	whenChanged?: string;
	isActual?: boolean;
	branchCode?: string;
	branchName?: string;
	blockCode?: string;
	blockName?: string;
	depCode?: string;
	depName?: string;
	depNames?: string;
	unitCode?: string;
	unitName?: string;
	parentUnitCode?: string;
	changeDate?: string;
	unitLevel?: string;
	parentLevel?: string;
}

export interface InstructionUpdate {
	instructionId?: number;
	instructionName?: string;
	instructionBranch?: string;
	instructionUrl?: string;
	whoChanged?: string;
	whenChanged?: string;
}

export interface InstructionCreate {
	instructionName: string;
	instructionBranch?: string;
	instructionUrl?: string;
	whoAdded?: string;
	whenAdded: string;
	whoChanged?: string;
	whenChanged: string;
	isActual: boolean;
}
