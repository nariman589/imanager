import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	border-radius: ${({ theme }) => theme.borderRadius};
	margin: 0;
	padding: 0;
	height: 3.375rem;
	background-color: #ffffff;
	box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const PanelElement = styled.li`
	list-style: none;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	margin: 0.5rem 0 0.5rem 0;
	border-left: 1px solid rgba(29, 29, 27, 0.1);

	:first-child {
		border: none;
	}
`;

export const PanelLink = styled(NavLink)`
	cursor: pointer;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.black};
	&.active {
		color: ${({ theme }) => theme.colors.main};
	}
	:hover {
		color: ${({ theme }) => theme.colors.main};
	}
`;
