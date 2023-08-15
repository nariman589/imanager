import {
	AccountingRejectReq,
	CertInfo,
	Document,
	EmployeeSign,
	Events,
	ExcelProps,
	FakeQrReq,
	file,
	HrAll,
	HrAllReq,
	HrConfirm,
	HrSign,
	PostToPortalReq,
	SapEvents,
	signature,
} from "./../../types/CabinetTypes";
import { InstructionCreate } from "./../../types/InstructionTypes";
import {
	SubstituteAllListI,
	SubstituteListI,
	SubstitutePostI,
	SubstituteRemoveI,
} from "./../../types/SubstituteTypes";
import { FileResult, Result } from "../../types/CoreTypes";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { OftetUsedListI, UpdateOftenUsedListI } from "types/OftenUsedTypes";
import { EmployeeI } from "types/EmployeeTypes";
import { MenuListI } from "types/MenuTypes";
import { BirthdayI } from "types/CommonTypes";
import { InstructionList, InstructionUpdate } from "types/InstructionTypes";
import { Documents } from "types/CabinetTypes";
import QueryString from "qs";
import { HistoryProps } from "types/HistoryTypes";

export const api = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = api;

export const host = `https://${
	new URL(process.env.REACT_APP_API_BASE_URL || "").host
}`;

const exeptionHandler = (response: AxiosResponse<any, any>) => {
	const { data } = response;
	const { isSuccess, Code } = data;
	if (
		(isSuccess !== undefined && !isSuccess) ||
		(Code !== undefined && Code < 0)
	)
		throw new Error(data.error);
	return response;
};

axios.interceptors.response.use(
	async (response) => {
		return exeptionHandler(response);
	},
	(error: AxiosError) => {
		const { data, status, config } = error.response as AxiosResponse;
		if (status >= 400) console.log(error.response);
		toast.error(`${config.url} : ${data?.error || data?.errors}`);
		return Promise.reject(error);
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string, config?: AxiosRequestConfig<any> | undefined) =>
		axios.get<T>(url, config).then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
	patch: <T>(url: string, body: {}) =>
		axios.patch<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	delete: <T>(url: string, body: {}) =>
		axios
			.delete<T>(url, {
				data: {
					...body,
				},
			})
			.then(responseBody),
};

const employeeApi = {
	getEmployee: (userLogin: string) =>
		requests.get<Result<EmployeeI>>("/api/EmployeeInfo/Employee", {
			params: { userLogin },
		}),
};

const oftenUsedApi = {
	getOftenUsed: () =>
		requests.get<Result<OftetUsedListI[]>>(
			"/api/OftenUsedProcesses/GetOftenUsedList"
		),
	increaseOftenUsedCount: (body: UpdateOftenUsedListI) => {
		requests.post<Result<string>>(
			"/api/OftenUsedProcesses/IncreaseCount",
			body
		);
	},
};

const menuApi = {
	getMenuByTabNumber: (menuType: number, tabNumber: number) =>
		requests.get<Result<MenuListI[]>>("/api/Menu/ByTabNumber", {
			params: {
				menuType,
				tabNumber,
			},
		}),
	getMenuByType: (menuType: number) =>
		requests.get<Result<MenuListI[]>>("/api/Menu/ByType", {
			params: {
				menuType,
			},
		}),
};

const commonApi = {
	getBrithday: () =>
		requests.get<Result<BirthdayI[]>>("/api/Common/EmployeesBirthday"),
};

const messagesFolderApi = {
	getMessages: <T>(url: string, userCode?: string) =>
		requests.get<Result<T>>(url, {
			params: {
				userCode,
			},
		}),
	setOpened: (requestGuid?: string, userCode?: string) =>
		requests.post<Result<string>>("/api/MessagesFolder/SetOpened", {
			requestGuid,
			userCode,
		}),
};

const substituteApi = {
	getAll: (userLogin?: string) =>
		requests.get<Result<SubstituteAllListI[]>>("/api/Substitute/All", {
			params: {
				userLogin,
			},
		}),
	add: (data: SubstitutePostI) =>
		requests.post<Result<string>>("/api/Substitute/Add", data),
	remove: (data: SubstituteRemoveI) =>
		requests.delete<Result<string>>("/api/Substitute/Delete", data),
	getEmployeesByTerm: (term?: string, tabNumber?: number) =>
		requests.get<Result<SubstituteListI[]>>("/api/Substitute/Get", {
			params: {
				term,
				tabNumber,
			},
		}),
};

const instuctionsApi = {
	getAll: () =>
		requests.get<Result<InstructionList[]>>("/api/Instructions/All"),
	delete: (id: number) =>
		requests.delete<Result<string>>("/api/Instructions/Delete", { id }),
	update: (data: InstructionUpdate) =>
		requests.patch<Result<string>>("/api/Instructions/Update", data),
	add: (data: InstructionCreate) =>
		requests.post<Result<string>>("/api/Instructions/Create", data),
};

const fileApi = {
	postFile: (data: FormData) =>
		requests.post<FileResult>(
			"https://i-manager-test.tsb.kz/API/UploadFile/InfoDocStore",
			data
		),
};

const cabinetApi = {
	getEmployeeAll: (tabNumber?: string) =>
		requests.get<Result<Documents>>("/api/Cabinet/EmployeeAll", {
			params: {
				tabNumber,
			},
		}),
	getHrAll: (data: HrAllReq) =>
		requests.post<Result<HrAll>>("/api/Cabinet/HrAll", data),
	getCertInfo: (data: signature) =>
		requests.post<Result<CertInfo>>("/api/Cabinet/CertInfo", data),
	getSapEvents: () =>
		requests.get<Result<SapEvents[]>>("/api/Cabinet/SapEvents"),
	getDocumentFiles: (id?: string) =>
		requests.get<Result<file[]>>("/api/Cabinet/DocumentFiles", {
			params: { id },
		}),
	reject: (id: string, comment: string, execTabNum?: string) =>
		requests.get<Result<string>>("/api/Cabinet/Reject", {
			params: { id, execTabNum, comment },
		}),
	revoke: (id: string, execTabNum?: string) =>
		requests.get<Result<string>>("/api/Cabinet/Revoke", {
			params: { id, execTabNum },
		}),
	fakeQr: (data: FakeQrReq) =>
		requests.post<Result<string>>("/api/Cabinet/FakeQR", data),
	getEvents: (id: string) =>
		requests.get<Result<Events>>("/api/Cabinet/Events", { params: { id } }),
	employeeSign: (data: EmployeeSign) =>
		requests.post<Result<string>>("/api/Cabinet/EmployeeSign", data),
	hrConfirm: (data: HrConfirm) =>
		requests.post<Result<string>>("/api/Cabinet/HrConfirmDocument", data),
	hrSign: (data: HrSign) =>
		requests.post<Result<string>>("/api/Cabinet/HrSign", data),
	hrExcell: (data: ExcelProps) =>
		requests.get<ArrayBuffer>("/api/Cabinet/HrExcel", {
			params: data,
			responseType: "arraybuffer",
		}),
	postToPortal: (data: PostToPortalReq) =>
		requests.post<Result<string>>("/api/Cabinet/PostToPortal", data),
	getAccountingAll: (data: HrAllReq) =>
		requests.post<Result<HrAll>>("/api/Cabinet/AccountanceAll", data),
	accountingConfirm: (data: HrConfirm) =>
		requests.post<Result<string>>(
			"/api/Cabinet/AccountanceConfirmDocument",
			data
		),
	accountingReject: (data: AccountingRejectReq) =>
		requests.post<Result<string>>(
			"/api/Cabinet/AccountanceRejectDocument",
			data
		),
	accountingExcel: (data: ExcelProps) =>
		requests.get<ArrayBuffer>("/api/Cabinet/AccountanceExcel", {
			params: data,
			responseType: "arraybuffer",
		}),
	createDocument: (data: Document) =>
		requests.post<Result<string>>("/api/Cabinet/CreateDocument", data),
};

const historyApi = {
	getById: (processGuid?: string) =>
		requests.get<Result<HistoryProps[]>>("/api/History/ById", {
			params: {
				processGuid,
			},
		}),
};

const agent = {
	employeeApi,
	oftenUsedApi,
	menuApi,
	commonApi,
	messagesFolderApi,
	substituteApi,
	instuctionsApi,
	fileApi,
	cabinetApi,
	historyApi,
};

export default agent;
