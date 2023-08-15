import React from "react";
import {
	PersonInfoContainer,
	PersonInfoFiled,
	PersonInfoFileds,
	PersonInfoFiledTitle,
	PersonName,
	PersonPicture,
	PersonPictureWrapper,
	PersonPosition,
	PersonWrapper,
} from "./components";
import Modal from "./Modal";
import { useAuth } from "components/hooks/useAuth";
import { convertDate } from "components/utils/helpers";

const PersonInfoModal = ({ onClick, openRef }: any) => {
	const { user } = useAuth();

	const userData = {
		name: user?.employeeFullName,
		positionName: user?.employeePositionName,
		img: user?.employeePhotoUrl,
		info: [
			{
				fieldName: "Подразделение :",
				fieldData: user?.employeeDepartmentName,
			},
			{
				fieldName: "Табельный номер :",
				fieldData: user?.employeeTabNumber,
			},
			{
				fieldName: "Дата приема :",
				fieldData: user?.employeeRecruitmentDateString,
			},
			{
				fieldName: "Дата последнего перевода :",
				fieldData: user?.employeeCurrentPositionTransferDateString,
			},
			{
				fieldName: "Почта :",
				fieldData: user?.employeeEmail ?? "",
			},
			{
				fieldName: "Адрес места дислокации :",
				fieldData: user?.employeeBranchName,
			},
			{
				fieldName:
					"Количество накопленных остатков отпускных дней (трудовой) :",
				fieldData: user?.employeeLaborLeave,
			},
			{
				fieldName:
					"Количество накопленных остатков отпускных дней (экология) :",
				fieldData: user?.employeeEcologicalLeave,
			},

			{
				fieldName: "Сведения о детях :",
				fieldData: user?.employeeChildrenInfo?.map(
					(item) => `${item.childFullName} (${item.childGender})`
				),
			},
		],
	};
	return (
		<Modal onClick={onClick} openRef={openRef}>
			<PersonWrapper>
				<PersonPictureWrapper>
					<PersonPicture src={userData.img} alt="Фото" />
					<PersonName>{userData.name}</PersonName>
					<PersonPosition>{userData.positionName}</PersonPosition>
				</PersonPictureWrapper>
				<PersonInfoContainer>
					{userData.info.map((info, index) => (
						<PersonInfoFileds key={info.fieldName + index}>
							<PersonInfoFiledTitle>{info.fieldName}</PersonInfoFiledTitle>
							<PersonInfoFiled>{info.fieldData}</PersonInfoFiled>
						</PersonInfoFileds>
					))}
				</PersonInfoContainer>
			</PersonWrapper>
		</Modal>
	);
};

export default PersonInfoModal;
