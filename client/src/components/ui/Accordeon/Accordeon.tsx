import React, { useEffect, useState } from "react";
import {
	AccordeonList,
	AccordeonListWrapper,
	AccordeonTitle,
	AccordeonWrapper,
	Chevron,
} from "./components";
import chevron from "assets/chevron.svg";
import { MenuListI, MenuListWithChildrensI } from "types/MenuTypes";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
	data: MenuListWithChildrensI;
	setProcess: any;
	process: MenuListI | null;
}

function Accordeon({ data, setProcess, process }: Props) {
	const location = useLocation();
	const [open, setOpen] = useState(location.pathname.includes(data.name));
	const nav = useNavigate();

	return (
		<AccordeonWrapper
			onClick={() => {
				setOpen((v) => !v);
			}}
		>
			<AccordeonTitle isActive={open} onClick={() => nav(data.name)}>
				{data.description}
				<Chevron isActive={open} src={chevron} />
			</AccordeonTitle>
			{open && (
				<AccordeonListWrapper onClick={(e) => e.stopPropagation()}>
					{data.children.map((item, index: number) => (
						<AccordeonList
							key={item.name + index}
							onClick={(e) => {
								e.preventDefault();
								setProcess(item);
							}}
							isActive={process?.id === item.id}
						>
							{item.description}
						</AccordeonList>
					))}
				</AccordeonListWrapper>
			)}
		</AccordeonWrapper>
	);
}

export default Accordeon;
