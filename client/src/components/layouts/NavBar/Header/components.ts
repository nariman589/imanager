import styled from "styled-components";

export const Header = styled.header`
	background-color: #ffffff;
	height: 5.25rem;
	display: flex;
	justify-content: center;
	box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const HeaderElementsWrapper = styled.ul`
	display: flex;
	list-style: none;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
	width: 90vw;
	padding: 0;
`;

export const HeaderElement = styled.li``;

export const Logo = styled.img`
	cursor: pointer;
`;
