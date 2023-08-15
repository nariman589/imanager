import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
	display: flex;
	align-items: center;
	margin-top: 1.625rem;
	background-color: #1d1d1b;
	height: 300px;
	color: white;
`;

export const Elements = styled.div`
	width: 90vw;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
	gap: 5.25rem;
`;
export const Element = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Urfc = styled.div`
	display: flex;
	flex-direction: column;
`;

export const UrfcSubtitle = styled.div`
	font-size: 0.875rem;
	opacity: 0.5;
`;

export const FooterLinks = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 6.25rem;
	gap: 0.75rem;
`;

export const FooterListElement = styled(NavLink)`
	text-decoration: none;
	color: white;
	font-size: 0.75rem;
	:hover {
		color: ${({ theme }) => theme.colors.main};
	}

	::before {
		content: "";
		background: ${({ theme }) => theme.colors.main};
		border-radius: 0.75rem;
		padding-inline: 0.36rem;
		margin-inline-end: 0.385rem;
	}
`;

export const FooterTitle = styled.div`
	color: white;
	font-weight: 600;
	margin-bottom: 0.75rem;
`;
