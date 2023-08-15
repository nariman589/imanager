import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const OffenUsedList = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 20rem;
	gap: 2rem;
`;

export const ListElement = styled.a`
	width: 28rem;
	color: ${({ theme }) => theme.colors.black};
	font-size: 1rem;
	text-decoration: none;
	word-wrap: break-word;
	cursor: pointer;
	:hover {
		color: ${({ theme }) => theme.colors.main};
	}
	::before {
		content: "";
		background: ${({ theme }) => theme.colors.main};
		border-radius: 3rem;
		padding-inline: 0.5rem;
		margin-inline-end: 0.75rem;
	}
`;

export const ListDescription = styled.div`
	margin-top: 0.2rem;
	font-size: 0.75rem;
	color: black;
	opacity: 0.4;
	width: 21.5rem;
	word-wrap: break-word;
	margin-left: 1.75rem;
`;
