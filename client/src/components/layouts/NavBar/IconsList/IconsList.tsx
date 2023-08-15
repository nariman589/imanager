import React, { useState } from "react";
import card from "assets/navBarItems/card.svg";
import applications from "assets/navBarItems/applications.svg";
import cake from "assets/navBarItems/cake.svg";
import instruction from "assets/navBarItems/instruction.svg";
import substitute from "assets/navBarItems/substitute.svg";
import {
	List,
	ListElement,
	Icon,
	BTitle,
	BBody,
	BDepartment,
	BImg,
	BItem,
	BName,
	BWrapper,
	Balloon,
	Balloons,
} from "./components";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import Modal from "components/ui/Modal/Modal";
import { BirthdayI } from "types/CommonTypes";
import agent from "components/api/agent";
import {
	APPLICATIONS,
	CARDS,
	INSTRUCTIONS,
	SUBSTITUTE,
} from "components/variables/urlVariables";

function IconsList() {
	const { open, setOpen, openRef } = useClickOutside();

	const [birthday, setBirthday] = useState<BirthdayI[] | null>(null);
	const [birthdayLoading, setBirthdayLoading] = useState(false);

	const getBrithday = async () => {
		setOpen(true);
		setBirthdayLoading(true);
		setBirthday((await agent.commonApi.getBrithday()).value);
		setBirthdayLoading(false);
	};

	const iconsList = [
		{
			icon: card,
			url: CARDS,
			openNewTab: true,
			title: "Пластиковые Карты",
		},
		{
			icon: instruction,
			url: INSTRUCTIONS,
			title: "Инструкции",
		},
		{
			icon: cake,
			url: "",
			title: "Дни Рождения",
			func: getBrithday,
		},
		{
			icon: applications,
			url: APPLICATIONS,
			title: "Приложения",
		},
		{
			icon: substitute,
			url: SUBSTITUTE,
			title: "Замещение",
		},
	];
	return (
		<List>
			{iconsList.map((item, index) => (
				<ListElement
					key={item.url + index}
					to={item.url}
					title={item.title}
					target={item?.openNewTab ? "_blank" : "_self"}
					onClick={() => item?.func && item?.func()}
				>
					<Icon src={item.icon} />
				</ListElement>
			))}
			{open && (
				<>
					<Balloons>
						<Balloon />
						<Balloon />
						<Balloon />
						<Balloon />
						<Balloon />
					</Balloons>
					<Modal openRef={openRef}>
						<BTitle>Именинники</BTitle>
						<BWrapper>
							{birthday?.map((item) => (
								<BItem key={item.employeeFullName}>
									<BImg src={item.employeePhotoUrl} alt="Фото" />
									<BBody>
										<BName>{item.employeeFullName}</BName>
										<BDepartment>{item.employeeDepartmentName}</BDepartment>
									</BBody>
								</BItem>
							))}
						</BWrapper>
					</Modal>
				</>
			)}
		</List>
	);
}

export default IconsList;
