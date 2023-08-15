import React from "react";
import {
	FloatingTextContainer,
	FloatingTextWrapper,
	FloatingText,
} from "./components";

function FloatingTexts() {
	const textArray = [
		{
			text: "Процессы HR",
			x: 8,
			y: 9.25,
		},
		{
			text: "Персонализация",
			x: 25,
			y: 40.25,
		},
		{
			text: "Открытость",
			x: 18.75,
			y: 78.375,
		},
		{
			text: "Заявка на отпуск",
			x: 70.75,
			y: 10.375,
		},
		{
			text: "Технологичность",
			x: 67,
			y: 40.5,
		},

		{
			text: "Подбор/прием персонала",
			x: 73.75,
			y: 70.375,
		},
	];
	return (
		<FloatingTextContainer>
			<FloatingTextWrapper>
				{textArray.map((item, index) => (
					<FloatingText
						key={item.text}
						positionX={item.x}
						positionY={item.y}
						floatingType={index % 2 === 0}
					>
						{item.text}
					</FloatingText>
				))}
			</FloatingTextWrapper>
		</FloatingTextContainer>
	);
}

export default FloatingTexts;
