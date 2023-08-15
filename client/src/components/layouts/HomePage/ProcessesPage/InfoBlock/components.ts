import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const InfoBlockTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const StartBtn = styled.a`
	position: relative;
	padding: 0;
	background-color: white;
	border-radius: ${({ theme }) => theme.borderRadius};
	border: 1px solid ${({ theme }) => theme.colors.main};
	cursor: pointer;
	display: flex;
	text-decoration: none;
	width: 20.625rem;
	height: 3.125rem;
	::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 0%;
		height: 100%;
		background-color: ${({ theme }) => theme.colors.main};
		transition: all 0.5s;
		border-radius: ${({ theme }) => theme.borderRadius};
	}
	:hover {
		::before {
			width: 100%;
			border-radius: ${({ theme }) => theme.borderRadius};
		}
	}
`;

export const BtnText = styled.div`
	color: ${({ theme }) => theme.colors.main};
	z-index: 10;
	transition: all 0.5s;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.25rem;
	width: 100%;
	height: 100%;
	:hover {
		color: white;
	}
`;

export const InfoBlockData = styled.div``;
