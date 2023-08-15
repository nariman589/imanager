import { choosenProcess } from "types/CoreTypes";
import React from "react";
import {
	ElementsContainer,
	Title,
} from "../../../../pages/MainPage/components";
import { BtnText, InfoBlockData, InfoBlockTitle, StartBtn } from "./components";
import { TypeAnimation } from "react-type-animation";
import { MenuListI } from "types/MenuTypes";
import agent from "components/api/agent";

interface Props {
	process: MenuListI | null;
}

const InfoBlock = ({ process }: Props) => {
	if (!process)
		return (
			<ElementsContainer>
				<TypeAnimation
					sequence={["Выберите процесс", 3000]}
					wrapper="div"
					cursor={true}
					repeat={0}
					style={{ fontSize: "2em" }}
				/>
			</ElementsContainer>
		);

	return (
		<ElementsContainer>
			<InfoBlockTitle>
				<Title>{process.description}</Title>
				<StartBtn
					href={process.link}
					target="_blank"
					onClick={() =>
						agent.oftenUsedApi.increaseOftenUsedCount({ id: process.id })
					}
				>
					<BtnText>Запустить процесс</BtnText>
				</StartBtn>
			</InfoBlockTitle>
			<InfoBlockData></InfoBlockData>
		</ElementsContainer>
	);
};

export default InfoBlock;
