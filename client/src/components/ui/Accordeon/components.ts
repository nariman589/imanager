import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

interface AccordeonTitleI {
	isActive: boolean;
}

export const AccordeonWrapper = styled.div`
	border-radius: ${({ theme }) => theme.borderRadius};
	text-decoration: none;
	cursor: pointer;
`;

export const AccordeonTitle = styled.div<AccordeonTitleI>`
	padding: 1.25rem;
	display: flex;
	gap: 0.2rem;
	align-items: center;
	font-weight: 600;
	justify-content: space-between;
	color: ${({ isActive, theme }) => (isActive ? "white" : theme.colors.black)};
	background-color: ${({ isActive, theme }) =>
		isActive ? theme.colors.main : theme.colors.grey};
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
	border-bottom-left-radius: ${({ isActive }) =>
		isActive ? "none" : "inherit"};
	border-bottom-right-radius: ${({ isActive }) =>
		isActive ? "none" : "inherit"};
	transition: 0.2s;
`;

export const AccordeonListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75em;
	padding: 1rem 1.75rem;
	border-bottom-left-radius: inherit;
	border-bottom-right-radius: inherit;
	background-color: ${({ theme }) => theme.colors.grey};
`;

interface AccordeonListI {
	isActive: boolean;
}

export const AccordeonList = styled.div<AccordeonListI>`
	text-decoration: none;
	color: ${({ isActive, theme }) =>
		isActive ? theme.colors.main : theme.colors.black};
	font-size: 0.875rem;

	:hover {
		color: ${({ theme }) => theme.colors.main};
	}
`;

export const Chevron = styled.img<AccordeonTitleI>`
	width: 1rem;
	height: 1rem;
	padding: 5px;
	border-radius: 50px;
	background-color: white;
	transition: 0.2s;
	transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "")};
`;
