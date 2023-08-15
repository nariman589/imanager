import { TBodyValues } from "components/ui/Table/TableTypes";
import { MenuListI } from "types/MenuTypes";

export const getLinkTypeAndDataToTable = (message: MenuListI | null) => {
	switch (message?.link) {
		//Hr
		case "/StartProcessing/MessageFolder/HRIndex":
			return {
				link: "/api/MessagesFolder/AllHr",
				tHeaderList: hrHead,
				tBodyList: hrBody,
				isArchive: false,
			};
		case "/StartProcessing/Archive/HRIndex":
			return {
				link: "/api/MessagesFolder/AllHrArchive",
				tHeaderList: hrArchiveHead,
				tBodyList: hrArchiveBody,
				isArchive: true,
			};

		//Процессы АХД
		case "/StartProcessing/AHDMessageFolder/AHDIndex":
			return {
				link: "/api/MessagesFolder/AHD",
				tHeaderList: hrHead,
				tBodyList: hrBody,
				isArchive: false,
			};
		case "/StartProcess/AHDArchive/AHDIndex":
			return {
				link: "/api/MessagesFolder/AHDArchive",
				tHeaderList: hrArchiveHead,
				tBodyList: hrArchiveBody,
				isArchive: true,
			};

		//Вопросы для заседание УКО
		case "/StartProcessing/UKOMessageFolder/UKOIndex":
			return {
				link: "",
				tHeaderList: [],
				tBodyList: [],
				isArchive: false,
			};
		case "/StartProcessing/UKOArchive/UKOIndex":
			return {
				link: "",
				tHeaderList: [],
				tBodyList: [],
				isArchive: true,
			};

		//Платежные карточик
		case "/StartProcessing/CardsMessageFolder/Index":
			return {
				link: "/api/MessagesFolder/AllCards",
				tHeaderList: cardsHead,
				tBodyList: cardsBody,
				isArchive: false,
			};
		case "/StartProcessing/CardsArchive/Index":
			return {
				link: "/api/MessagesFolder/AllCardsArchive",
				tHeaderList: cardsArchiveHead,
				tBodyList: cardsArchiveBody,
				isArchive: true,
			};

		//Процессы платежи и переводы
		case "/StartProcessing/MessageFolder/PaymentProcessesIndex":
			return {
				link: "/api/MessagesFolder/Payment",
				tHeaderList: hrHead,
				tBodyList: hrBody,
				isArchive: false,
			};
		case "/StartProcessing/Archive/PaymentProcessesIndex":
			return {
				link: "/api/MessagesFolder/PaymentArchive",
				tHeaderList: hrArchiveHead,
				tBodyList: hrArchiveBody,
				isArchive: true,
			};

		//Диспутные транзакции по платежным картам
		case "/StartProcessing/MessageFolder/DisputTransactionCardIndex":
			return {
				link: "/api/MessagesFolder/DisputTransactionCard",
				tHeaderList: hrHead,
				tBodyList: hrBody,
				isArchive: false,
			};
		case "/StartProcessing/Archive/DisputTransactionCardIndex":
			return {
				link: "/api/MessagesFolder/DisputTransactionCardArchive",
				tHeaderList: hrArchiveHead,
				tBodyList: hrArchiveBody,
				isArchive: true,
			};

		//Установка и передислокация банкоматов
		case "/StartProcessing/ATMRelocationMessageFolder/ATMRelocationIndex":
			return {
				link: "/api/MessagesFolder/ATM",
				tHeaderList: hrHead,
				tBodyList: hrBody,
				isArchive: false,
			};
		case "/StartProcessing/ATMRelocationArchive/ATMRelocationIndex":
			return {
				link: "/api/MessagesFolder/ATMArchive",
				tHeaderList: hrArchiveHead,
				tBodyList: hrArchiveBody,
				isArchive: true,
			};

		//Заявка IPV
		case "/StartProcessing/IPVMessageFolder/Index":
			return {
				link: "/api/MessagesFolder/IPV",
				tHeaderList: hrHead,
				tBodyList: hrBody,
				isArchive: false,
			};
		case "/StartProcessing/IPVArchive/Index":
			return {
				link: "/api/MessagesFolder/IPVArchive",
				tHeaderList: hrArchiveHead,
				tBodyList: hrArchiveBody,
				isArchive: true,
			};

		//Согласование Казначейства платежей в нац.валюте
		case "/StartProcessing/TreasureApprovesMessageFolder/TreasureApprovesIndex":
			return {
				link: "/api/MessagesFolder/Treasure",
				tHeaderList: treaureHead,
				tBodyList: treasureBody,
				isArchive: false,
			};
		case "/StartProcessing/TreasureApprovesArhive/TreasureApprovesIndex":
			return {
				link: "/api/MessagesFolder/TreasureArchive",
				tHeaderList: treasureArchiveHead,
				tBodyList: treasureArchiveBody,
				isArchive: true,
			};

		//Запрос по Международному переводу
		case "/StartProcessing/InternationalTransferRequestMessageFolder/InternationalTransferRequestIndex":
			return {
				link: "/api/MessagesFolder/International",
				tHeaderList: hrHead,
				tBodyList: hrBody,
				isArchive: false,
			};
		case "/StartProcessing/InternationalTransferRequestArhive/InternationalTransferRequestArhiveIndex":
			return {
				link: "/api/MessagesFolder/InternationalArchive",
				tHeaderList: hrArchiveHead,
				tBodyList: hrArchiveBody,
				isArchive: true,
			};

		default:
			return {
				link: "",
				tHeaderList: [],
				tBodyList: [],
				isArchive: false,
			};
	}
};

export const hrHead = [
	{
		name: "Процесс",
		filterType: undefined,
	},

	{
		name: "Время поступления",
		filterType: undefined,
	},
	{
		name: "Рег. номер",
		filterType: undefined,
	},
	{
		name: "Филиал",
		filterType: undefined,
	},
	{
		name: "Подразделение",
		filterType: undefined,
	},
	{
		name: "ФИО сотрудника/кандидата",
		filterType: undefined,
	},
	{
		name: "ФИО инициатора",
		filterType: undefined,
	},
	{
		name: "Статус",
		filterType: undefined,
	},
	{
		name: "Тип сообщения",
		filterType: undefined,
	},
];

export const hrBody: TBodyValues[] = [
	{
		name: "processName",
	},
	{
		name: "messagE_DATE",
		type: "Date",
	},
	{
		name: "registrationNumber",
	},
	{
		name: "branchname",
	},
	{
		name: "depname",
	},
	{
		name: "clienT_NAME",
	},
	{
		name: "initiatorEmployeeFullName",
	},
	{
		name: "status",
	},
	{
		name: "response_required",
	},
];

export const hrArchiveHead = [
	{
		name: "Процесс",
		filterType: undefined,
	},

	{
		name: "Дата запуска",
		filterType: undefined,
	},
	{
		name: "Рег. номер",
		filterType: undefined,
	},
	{
		name: "Блок",
		filterType: undefined,
	},
	{
		name: "Статус",
		filterType: undefined,
	},
	{
		name: "Подразделение",
		filterType: undefined,
	},
	{
		name: "ФИО инициатора",
		filterType: undefined,
	},
	{
		name: "ФИО сотрудника/кандидата",
		filterType: undefined,
	},
];

export const hrArchiveBody: TBodyValues[] = [
	{
		name: "processName",
	},
	{
		name: "startDate",
		type: "Date",
	},
	{
		name: "registration_Number",
	},
	{
		name: "blockName",
	},
	{
		name: "status",
	},
	{
		name: "officeName",
	},
	{
		name: "initiatoR_NAME",
	},
	{
		name: "candidateFullName",
	},
];

export const cardsHead = [
	{
		name: "Процесс",
		filterType: undefined,
	},
	{
		name: "Время поступления",
		filterType: undefined,
	},
	{
		name: "Рег. номер",
		filterType: undefined,
	},
	{
		name: "Филиал",
		filterType: undefined,
	},
	{
		name: "Подразделение",
		filterType: undefined,
	},
	{
		name: "ФИО инициатора",
		filterType: undefined,
	},
	{
		name: "Филиал для получения пластика",
		filterType: undefined,
	},
	{
		name: "ЦБО для получения пластика",
		filterType: undefined,
	},
	{
		name: "Сегмент",
		filterType: undefined,
	},
	{
		name: "Тип пластика",
		filterType: undefined,
	},
	{
		name: "Количество пластика (ед.)",
		filterType: undefined,
	},
	{
		name: "Статус",
		filterType: undefined,
	},
	{
		name: "Тип сообщения",
		filterType: undefined,
	},
];

export const cardsBody: TBodyValues[] = [
	{ name: "processName" },
	{ name: "messagE_DATE", type: "Date" },
	{ name: "registrationNumber" },
	{ name: "branchname" },
	{ name: "depname" },
	{ name: "initiatorEmployeeFullName" },
	{ name: "plasticOrderingLibraryBranchName" },
	{ name: "plasticOrderingLibraryRoomName" },
	{ name: "plasticOrderingSegmentName" },
	{ name: "plasticOrderingPlasticTypeName" },
	{ name: "plasticOrderingQuantity" },
	{ name: "status" },
	{ name: "response_required" },
];

export const cardsArchiveHead = [
	{
		name: "Процесс",
		filterType: undefined,
	},
	{
		name: "Дата запуска",
		filterType: undefined,
	},
	{
		name: "Рег. номер",
		filterType: undefined,
	},
	{
		name: "Подразделение",
		filterType: undefined,
	},
	{
		name: "ФИО инициатора",
		filterType: undefined,
	},
];

export const cardsArchiveBody: TBodyValues[] = [
	{ name: "processName" },
	{ name: "startDate", type: "Date" },
	{ name: "registration_Number" },
	{ name: "blockName" },
	{ name: "initiatoR_NAME" },
];

export const treaureHead = [
	{
		name: "Процесс",
		filterType: undefined,
	},
	{
		name: "Статус",
		filterType: undefined,
	},
	{
		name: "Рег. номер",
		filterType: undefined,
	},
	{
		name: "Канал JB/нарочный",
		filterType: undefined,
	},
	{
		name: "БИН отправителя",
		filterType: undefined,
	},
	{
		name: "Наименование отправителя",
		filterType: undefined,
	},
	{
		name: "Сумма",
		filterType: undefined,
	},
	{
		name: "Дата/время",
		filterType: undefined,
	},
	{
		name: "Тип сообщения",
		filterType: undefined,
	},
];

export const treasureBody: TBodyValues[] = [
	{ name: "processName" },
	{ name: "status" },
	{ name: "registrationNumber" },
	{ name: "chanel" },
	{ name: "payer_BIN_IIN" },
	{ name: "payer_BIN_IINDescription" },
	{ name: "payer_Amount" },
	{ name: "messagE_DATE", type: "Date" },
	{ name: "response_required" },
];
export const treasureArchiveHead = [
	{
		name: "Процесс",
		filterType: undefined,
	},
	{
		name: "Рег. номер",
		filterType: undefined,
	},
	{
		name: "Канал JB/нарочный",
		filterType: undefined,
	},
	{
		name: "БИН отправителя",
		filterType: undefined,
	},
	{
		name: "Наименование отправителя",
		filterType: undefined,
	},
	{
		name: "Сумма",
		filterType: undefined,
	},
	{
		name: "Дата запуска",
		filterType: undefined,
	},
];

export const treasureArchiveBody: TBodyValues[] = [
	{ name: "processName" },
	{ name: "registration_Number" },
	{ name: "chanel" },
	{ name: "payer_BIN_IIN" },
	{ name: "payer_BIN_IINDescription" },
	{ name: "payer_Amount" },
	{ name: "startDate", type: "Date" },
];
