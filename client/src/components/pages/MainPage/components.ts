import styled from "styled-components";

export const PageWrapper = styled.div`
	display: grid;
	grid-template-columns: 25% 74%;
	gap: 1%;
`;

export const ElementsContainer = styled.div`
	padding: 1.625rem 2rem;
	background-color: #ffffff;
	box-shadow: ${({ theme }) => theme.boxShadow};
	border-radius: ${({ theme }) => theme.borderRadius};
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const Title = styled.div`
	font-size: 1.25rem;
`;
