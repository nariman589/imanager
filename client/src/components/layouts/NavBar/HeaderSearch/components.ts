import styled from "styled-components";

export const SearchWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	border-radius: 10px;
	width: 35rem;
	background-color: #f1f2f5;
`;
export const Input = styled.input`
	width: 90%;
	border-radius: 10px;
	border: none;
	outline: none;
	height: 2.375rem;
	background-color: #f1f2f5;
	padding-left: 1rem;
	font-family: inherit;
`;
export const Loupe = styled.img`
	cursor: pointer;
`;

export const SearchResult = styled.div`
	z-index: 100;
	position: absolute;
	top: 100%;
	width: calc(100% - 2rem);
	padding: 1rem;
	display: flex;
	gap: 0.5rem;
	flex-direction: column;
	background-color: white;
	box-shadow: ${({ theme }) => theme.boxShadow};
	border-radius: ${({ theme }) => theme.borderRadius};
`;

export const SearchItem = styled.a`
	color: ${({ theme }) => theme.colors.black};
	text-decoration: none;
	cursor: pointer;
	:hover {
		color: ${({ theme }) => theme.colors.main};
	}
`;
