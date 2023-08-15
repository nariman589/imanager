import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const List = styled.div`
	display: flex;
	list-style: none;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	padding: 0;
`;

export const ListElement = styled(NavLink)``;

export const Icon = styled.img`
	width: 2rem;
	height: 2rem;
	cursor: pointer;
	:hover {
		/* filter: contrast(20%); */
		filter: invert(40%) sepia(99%) saturate(1672%) hue-rotate(0deg)
			brightness(101%) contrast(107%);
	}
`;

export const BTitle = styled.div`
	text-align: center;
	font-size: 2rem;
	color: ${({ theme }) => theme.colors.main};
`;

export const BImg = styled.img`
	border-radius: 4rem;
`;

export const BItem = styled.div`
	display: grid;
	grid-template-columns: 8rem 1fr;
`;

export const BBody = styled.div``;

export const BName = styled.div`
	font-size: 1.2rem;
`;

export const BDepartment = styled.div`
	color: ${({ theme }) => theme.colors.main};
`;

export const BWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	height: 30rem;
	overflow-y: scroll;
`;

const ballons = keyframes`
0%,100%{ transform:translateY(0) rotate(-4deg); }
	50%{ transform:translateY(-25px) rotate(4deg); }
`;

export const Balloon = styled.div`
	display: inline-block;
	width: 120px;
	height: 145px;
	background: hsl(215, 50%, 65%);
	border-radius: 80%;
	position: relative;
	box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.07);
	margin: 20px 30px;
	transition: transform 0.5s ease;
	z-index: 10;
	animation: ${ballons} 4s ease-in-out infinite;
	transform-origin: bottom center;

	:before {
		content: "▲";
		font-size: 20px;
		color: hsl(215, 30%, 50%);
		display: block;
		text-align: center;
		width: 100%;
		position: absolute;
		bottom: -12px;
		z-index: -100;
	}
	:after {
		display: inline-block;
		top: 153px;
		left: 50%;
		position: absolute;
		height: 250px;
		width: 1px;
		margin: 0 auto;
		content: "";
		background: rgba(0, 0, 0, 0.2);
	}
	:nth-child(2) {
		background: hsl(245, 40%, 65%);
		animation-duration: 3.5s;
	}
	:nth-child(2):before {
		color: hsl(245, 40%, 65%);
	}

	:nth-child(3) {
		background: hsl(139, 50%, 60%);
		animation-duration: 3s;
	}
	:nth-child(3):before {
		color: hsl(139, 30%, 50%);
	}

	:nth-child(4) {
		background: hsl(59, 50%, 58%);
		animation-duration: 4.5s;
	}
	:nth-child(4):before {
		color: hsl(59, 30%, 52%);
	}

	:nth-child(5) {
		background: hsl(23, 55%, 57%);
		animation-duration: 5s;
	}
	:nth-child(5):before {
		color: hsl(23, 44%, 46%);
	}
`;

export const Balloons = styled.div`
	position: absolute;
	left: 20%;
`;
