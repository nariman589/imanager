import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ProccessElement = styled(NavLink)`
	text-decoration: none;
	border-radius: ${({ theme }) => theme.borderRadius};
	background-color: ${({ theme }) => theme.colors.grey};
	display: flex;
	align-items: center;
	padding-left: 1.25rem;
	color: ${({ theme }) => theme.colors.black};
	height: 3.5rem;
	transition: 0.2s;
	:hover {
		background-color: ${({ theme }) => theme.colors.main};
		color: white;
		transition: 0.2s;
	}
`;

export const Text = styled.span`
	word-wrap: break-word;
`;

export const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Button = styled(NavLink)`
	text-decoration: none;
	font-size: 1.25rem;
	background-color: ${({ theme }) => theme.colors.main};
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	border-radius: ${({ theme }) => theme.borderRadius};
	height: 3.125rem;
`;
