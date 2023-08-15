import {
	INSTRUCTIONS,
	PROFILE,
	APPLICATIONS,
	PROCESSES,
	MY_APPLICTONS,
} from "components/variables/urlVariables";
import React from "react";
import { Wrapper, PanelElement, PanelLink } from "./components";

function Panel() {
	const links = [
		{
			name: "Личный кабинет сотрудника",
			url: PROFILE,
		},
		{
			name: "Мои заявки",
			url: MY_APPLICTONS,
		},
		{
			name: "Процессы",
			url: PROCESSES,
		},
		{
			name: "Приложения",
			url: APPLICATIONS,
		},
		{
			name: "Инструкции",
			url: INSTRUCTIONS,
		},
	];
	return (
		<Wrapper>
			{links.map((item, index) => (
				<PanelElement key={item.name + index}>
					<PanelLink to={item.url}>{item.name}</PanelLink>
				</PanelElement>
			))}
		</Wrapper>
	);
}

export default Panel;
