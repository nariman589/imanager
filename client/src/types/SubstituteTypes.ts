export interface SubstituteListI {
	fio: string;
	department: string;
	position: string;
	phonelocal: string;
	email: string;
	logonname: string;
	tabNumber: number;
	iin?: string;
}

export interface SubstituteAllListI {
	userCode: string;
	userName: string;
	endDate: string;
}

export interface SubstitutePostI {
	userCode?: string;
	assistant_code: string;
	assistant_name: string;
	enD_DATETIME: string;
}

export interface SubstituteRemoveI {
	userCode?: string;
	assistant_code: string;
}
