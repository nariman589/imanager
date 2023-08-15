export interface Documents {
	documents: Document[];
}
export interface Document {
	id?: string;
	executorTabNum?: number;
	employeeTabNum?: number;
	employeeFullName?: string;
	employeeIIN?: string;
	employeeBranchName?: string;
	employeeDepName?: string;
	sapEventId?: string;
	sapEventName?: string;
	createTime?: string;
	status?: number;
	statusCode?: string;
	statusDesc?: string;
	regNum?: string;
	regDate?: string;
	files: file[];
	executorFullName?: string;
	employeeGetDocTime?: string;
	employeeShortName?: string;
	executorShortName?: string;
	accountingFullName?: string;
	isNeedHRChief?: boolean;
	isNeedHRSubChief?: boolean;
	isNeedEmployeeReview?: boolean;
	isCandidate?: boolean;
}

export interface FakeQrReq {
	pdfDocument?: string;
	type: "pdf" | "docx";
	signer: signer;
}

export interface file {
	link: string;
	name: string;
	sign: boolean;
	fileData?: string;
}

export interface SapEvents {
	id: string;
	name: string;
}

export interface CertInfo {
	issuer: {
		country: string;
		commonName: string;
	};
	subject: {
		commonName: string;
		givenName: string;
		surname: string;
		serialNumber: string;
		notBefore: string;
		notAfter: string;
		keyUsage: string;
		extendedKeyUsage: string;
		authorityKeyIdentifier: string;
		keyIdentifier: string;
		certificateSerialNumber: string;
		signtureAlghoritm: string;
	};
}

export interface Events {
	events: Event[];
}

export interface Event {
	docId: string;
	employeeTabNum: number;
	employeeFullName: string;
	eventName: string;
	comment: string;
	createTime: string;
}
export interface signature {
	password: string;
	file?: string;
}

export interface EmployeeSign {
	signature: signature;
	document: Document;
	signer: signer;
}

export interface HrSign {
	signature: signature;
	documents: Document[];
	signer: signer;
}

export interface signer {
	fullName?: string;
	iin?: string;
	position?: string;
	dep?: string;
	tabNumber?: string;
}

export interface HrAllReq {
	docId?: string;
	page: number;
	status: number;
	fromDate?: string;
	toDate?: string;
	empTab: number;
	employeeTabNumber?: number;
	role: string;
	total?: number;
	totalPages?: number;
}

export interface HrAll {
	content: Document[];
	totalPages: number;
	itemCount: number;
	page: number;
	first: boolean;
	last: boolean;
	lastPage: number;
}

export interface HrConfirm {
	id: string;
	execTabNum?: string;
}

export interface PostToPortalReq {
	file?: string;
	fileName: string;
	candidateIin?: string;
	keyName: string;
}

export interface AccountingRejectReq {
	docId: string;
	comment: string;
	statusDesc: string;
	tabNumber: number;
}

export interface ExcelProps {
	status: number;
	tabNumber?: string;
	role: string;
	tab?: number;
	fromDate?: string;
	toDate?: string;
}
