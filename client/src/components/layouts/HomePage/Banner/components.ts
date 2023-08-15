import styled, { keyframes } from "styled-components";

interface FlotatingTextI {
	positionY: number;
	positionX: number;
	floatingType: boolean;
}

const circleMove = keyframes`
  0% {
      transform: rotate(0deg);
    }
    70% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0deg);
    }
`;

const floatTextFirstType = (y: number) => keyframes`
  50% {
        top: ${y + 1}%;
    }    
    100% { 
        top: ${y}%;
    }
`;
const floatTextSecondType = (y: number) => keyframes`
  0% { 
		top: ${y + 1}%;
    }
  50% {
	  top: ${y}%;
    }    
    100% { 
		top: ${y + 1}%;
    }
`;

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const Title = styled.div`
	position: absolute;
	color: white;
	font-size: 3rem;
	font-weight: 700;
	z-index: 12;
`;

export const CircleContainer = styled.div`
	position: absolute;
	/* padding: 60px 0; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 10;
`;

export const CircleWrapper = styled.div`
	position: relative;
	width: 260px;
	height: 260px;
`;

export const CircleZero = styled.div`
	background: #fffbfb34;
	border-radius: 50%;
	box-shadow: 0px 3px 7px 0.7px rgba(0, 0, 0, 0.5);
	box-sizing: content-box;
	height: 113px;
	width: 113px;
	position: absolute;
	top: 29%;
	left: 29%;
	::before {
		content: "";
		background: rgba(0, 0, 0, 0.07);
		position: absolute;
		width: 168px;
		height: 2px;
		left: -66%;
		top: 44%;
		transform: rotate(45deg);
		z-index: -2;
	}
	::after {
		content: "";
		background: rgba(255, 255, 255, 0.7);
		position: absolute;
		width: 18px;
		height: 1.5px;
		left: -98%;
		top: 45%;
		transform: rotate(90deg);
		animation: ${circleMove} 10s ease infinite;
	}
`;

export const CircleOne = styled.div`
	border: 15px solid;
	border-color: rgba(229, 247, 255, 0.7) #cbefffb3 transparent transparent;
	border-radius: 50%;
	box-sizing: content-box;
	height: 133px;
	width: 133px;
	position: absolute;
	top: 19%;
	left: 19%;
	z-index: -1;
	animation: ${circleMove} 10s ease infinite;
	::before {
		content: "";
		background: rgba(228, 246, 255, 0.7);
		border-radius: 50%;
		position: absolute;
		width: 4px;
		height: 4px;
		right: -66%;
		top: 39%;
		animation: ${circleMove} 10s ease infinite;
	}
	::after {
		content: "";
		background: rgba(249, 253, 255, 0.7);
		border-radius: 50%;
		width: 4px;
		height: 4px;
		position: absolute;
		left: -62%;
		top: 42%;
		animation: ${circleMove} 10s ease infinite;
	}
`;

export const CircleTwo = styled.div`
	background: rgba(0, 0, 0, 0.017);
	border: 25px solid;
	border-color: rgba(252, 246, 253, 0.3) transparent transparent;
	border-radius: 50%;
	box-shadow: 15px 0 25px -20px rgba(0, 0, 0, 0.65);
	box-sizing: content-box;
	height: 125px;
	width: 125px;
	position: absolute;
	top: 16%;
	left: 16%;
	z-index: -2;
	animation: ${circleMove} 14s ease infinite;
`;

export const CircleThree = styled.div`
	background: rgba(255, 255, 255, 0.012);
	border: 2px solid;
	border-color: #ffffff transparent;
	border-radius: 50%;
	box-sizing: content-box;
	height: 203px;
	width: 203px;
	position: absolute;
	z-index: -3;
	top: 9%;
	left: 9%;
	animation: ${circleMove} 15s ease infinite;
`;

export const FloatingTextContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`;

export const FloatingTextWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
`;

export const FloatingText = styled.div<FlotatingTextI>`
	position: absolute;
	top: ${({ positionY }) => positionY}%;
	left: ${({ positionX }) => positionX}%;
	color: white;
	font-size: 1.75rem;
	z-index: 2;
	opacity: 0.7;
	animation: ${({ positionY, floatingType }) =>
			floatingType
				? floatTextFirstType(positionY)
				: floatTextSecondType(positionY)}
		3.5s infinite ease-in-out;
`;
