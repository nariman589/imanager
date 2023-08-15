import { TBodyValues, THeaderProps } from "components/ui/Table/TableTypes";

export const personalHeaders: THeaderProps[] = [
	{ name: "Номер приказа" },
	{ name: "Дата приказа" },
	{ name: "Тип документа" },
	{ name: "Исполнитель кадровой службы" },
	{ name: "Статус" },
	{ name: "Время регистрации" },
];

export const personalBody: TBodyValues[] = [
	{ name: "regNum" },
	{ name: "createTime", type: "Date" },
	{ name: "sapEventName" },
	{ name: "executorFullName" },
	{ name: "statusDesc" },
	{ name: "regDate" },
];
export const hrHeaders: THeaderProps[] = [
	{ name: "ФИО сотрудника" },
	{ name: "Филиал" },
	{ name: "Подразделение" },
	{ name: "Номер приказа" },
	{ name: "Дата приказа" },
	{ name: "Тип документа" },
	{ name: "Исполнитель" },
	{ name: "Статус" },
];

export const hrBody: TBodyValues[] = [
	{ name: "employeeFullName" },
	{ name: "employeeBranchName" },
	{ name: "employeeDepName" },
	{ name: "regNum" },
	{ name: "regDate" },
	{ name: "sapEventName" },
	{ name: "executorFullName" },
	{ name: "statusDesc" },
];
