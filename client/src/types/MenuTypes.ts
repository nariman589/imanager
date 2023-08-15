export interface MenuListI {
	id: number;
	parentMenuId: number;
	name: string;
	description: string;
	link: string;
	controller: string;
	method: string;
	icon: string;
	isDropdownList: true;
}

export interface MenuListWithChildrensI extends MenuListI {
	children: MenuListI[];
}
