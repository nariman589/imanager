export interface MessagesI {
	processCode: string;
	processVersion: string;
	schemE_ID: string;
	requesT_GUID: string;
	opeN_DATETIME: string;
	opeN_USERCODE: string;
	response_required: string;
	messagE_DATE: string;
	branchname: string;
	depname: string;
	status: string;
	registrationNumber: string;
	clienT_NAME: string;
	initiatorEmployeeFullName: string;
	processName: string;
	documentName: string;
	reasonName: string;
}

export interface MessagesArchiveI {
	processGuid: string;
	processCode: string;
	processVersion: string;
	startDate: string;
	finishDate: string;
	procesS_STATUS: string;
	status: string;
	processName: string;
	initiatoR_NAME: string;
	registration_Number: string;
	candidateFullName: string;
	blockName: string;
	officeName: string;
	operationTypeName: string;
	operationSubTypeName: string;
	documentName: string;
}
