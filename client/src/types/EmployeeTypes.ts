export interface EmployeeI {
	employeeTabNumber: string;
	employeeLogin: string;
	employeeFullName: string;
	employeeName: string;
	employeePositionCode: string;
	employeePositionName: string;
	employeePositionLevel: number;
	employeePhoneNumber: string;
	employeeMobileNumber: string;
	employeeEmail: string;
	employeeBranchCode: string;
	employeeBranchName: string;
	employeeBlockCode: string;
	employeeBlockName: string;
	employeeDepartmentCode: string;
	employeeDepartmentName: string;
	employeeOfficeCode: string;
	employeeOfficeName: string;
	employeeDivisionCode: string;
	employeeDivisionName: string;
	employeeWorkAdditionalDescription: string;
	employeeRecruitmentDateString: string;
	employeeRecruitmentDate: string;
	employeeCurrentPositionTransferDateString: string;
	employeeCurrentPositionTransferDate: string;
	employeeLaborLeave: string;
	employeeEcologicalLeave: string;
	employeePhotoUrl: string;
	substituteEndDate: string;
	employeeIIN: string;
	randomCode: string;
	employeeRole: Roles[];
	employeeChildrenInfo: [
		{
			childFullName: string;
			childBirthDate: string;
			childBirthDateString: string;
			childGender: string;
		}
	];
}

export type Roles =
	| "Hr"
	| "HrHead"
	| "HrChief"
	| "HrAccounting"
	| "InstructionsAdmin"
	| "InstructionsNotAdmin";
