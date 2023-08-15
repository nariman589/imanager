import styled, { keyframes } from "styled-components";

const animation = keyframes`
0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
`;

export const Loader = styled.div`
	display: inline-block;
	width: 15px;
	height: 15px;
	animation: ${animation} 1.2s linear infinite;
	:after {
		content: " ";
		display: block;
		border-radius: 50%;
		border: 8px solid ${({ theme }) => theme.colors.main};
		border-color: ${({ theme }) => theme.colors.main} transparent
			${({ theme }) => theme.colors.main} transparent;
	}
`;
