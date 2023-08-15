import { TBodyProps, TBodyValues } from "components/ui/Table/TableTypes";
import { MenuListI, MenuListWithChildrensI } from "types/MenuTypes";
import agent, { api, host } from "../api/agent";

export const increaseProccesCount = (id: number) => {
	agent.oftenUsedApi.increaseOftenUsedCount({ id });
};

export const parseByParents = (
	list: MenuListI[] | null
): MenuListWithChildrensI[] | null => {
	if (!list) return null;
	const nestedMap: any = {}; // Создаем объект для хранения связей между id и элементами

	// Создаем структуру дерева
	list.forEach((element) => {
		if (!nestedMap[element.id]) {
			nestedMap[element.id] = { ...element, children: [] };
		} else {
			nestedMap[element.id] = { ...nestedMap[element.id], ...element };
		}

		// Если у элемента есть parentId, добавляем его в children родительского элемента
		if (element.parentMenuId !== null) {
			if (!nestedMap[element.parentMenuId]) {
				nestedMap[element.parentMenuId] = { children: [] };
			}
			nestedMap[element.parentMenuId].children.push(nestedMap[element.id]);
		}
	});

	// Возвращаем корневые элементы (те, у которых нет родителей)
	const values: MenuListWithChildrensI[] = Object.values(nestedMap);
	const result = values.filter(
		(element: any) => element.children.length > 0 && element?.name
	);
	return result;
};

export const generateBodyForTable = <T>(
	list: T[] | null,
	namesList: TBodyValues[],
	isArchive?: boolean
): TBodyProps[] => {
	if (!list) return [];

	return list.map((item: any) => ({
		link: generateLink(item, isArchive),
		guid: item?.requesT_GUID || item?.processGuid,
		isOpened: checkIsOpened(item?.opeN_DATETIME),
		values: namesList.map((value) => ({
			...value,
			name: value.name === "@HISTORY" ? "@HISTORY" : item[value.name],
		})),
	}));
};

export const generateLink = (item: any, isArchive?: boolean) => {
	if (!isArchive)
		return `${host}/${item["processCode"]}/${Number(item["processVersion"])}/${
			item["schemE_ID"]
		}/Index/?RequestGuid=${item["requesT_GUID"]}`;
	return `${host}/${item["processCode"]}/${Number(
		item["processVersion"]
	)}/Archive/Index/?ProcessGuid=${item["processGuid"]}`;
};

export function isValidDate(dateString?: string) {
	if (!dateString) return false;
	if (!isNaN(Number(dateString))) return false;
	return !isNaN(Date.parse(dateString));
}

export const convertDate = (date: string) => {
	return new Date(date).toLocaleDateString(undefined, {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const checkIsOpened = (date?: string) => {
	if (!date) return true;
	return !isOldDate(date);
};

export const isOldDate = (date?: string) => {
	if (!date) return true;
	return new Date(date).getTime() < 30000000000;
};

export const convertBase64 = (file: File) => {
	return new Promise<string | undefined>((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result?.toString().split(",")[1]);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};
