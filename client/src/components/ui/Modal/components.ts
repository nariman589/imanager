import styled from "styled-components";

export const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 15;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: #2525254d;
`;

export const ModalWrapper = styled.div`
	min-width: 30vw;
	max-width: 60vw;
	position: relative;
	padding: 1.625rem;
	background-color: white;
	border-radius: ${({ theme }) => theme.borderRadius};
	transition: 0.2s;
`;
export const CloseIcon = styled.img`
	width: 10px;
	height: 10px;
	position: absolute;
	right: 1.625rem;
	top: 1.625rem;
	cursor: pointer;
`;

export const PersonWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const PersonPictureWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`;

export const PersonPicture = styled.img`
	width: 5.25rem;
	height: 5.25rem;
	border-radius: 5.25rem;
`;

export const PersonName = styled.div`
	color: ${({ theme }) => theme.colors.black};
	font-size: 1rem;
`;

export const PersonPosition = styled.div`
	font-size: 0.75rem;
	color: ${({ theme }) => theme.colors.black};
	opacity: 0.5;
`;

export const PersonInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75em;
`;

export const PersonInfoFileds = styled.div`
	width: 16.25rem;
`;

export const PersonInfoFiledTitle = styled.div`
	font-size: 0.75rem;
	font-weight: 600;
`;
export const PersonInfoFiled = styled.div`
	font-size: 0.75rem;
`;

export const MOptions = styled.div`
	position: absolute;
	top: 100%;
	z-index: 20;
	background-color: white;
	width: 100%;
	box-shadow: ${({ theme }) => theme.boxShadow};
	border-radius: ${({ theme }) => theme.borderRadius};
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const MOption = styled.div`
	padding: 0.5rem;
	cursor: pointer;
	transition: 0.2s all;

	:hover {
		color: white;
		background-color: ${({ theme }) => theme.colors.main};
	}
`;

export const MTitle = styled.h3``;

export const MBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 1rem;
	max-height: 70vh;
	overflow-y: scroll;
`;

export const MInputWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const MInput = styled.input`
	border: none;
	outline: none;
	border-radius: 10px;
	border: none;
	outline: none;
	height: 2.375rem;
	background-color: #f1f1f1;
	padding-left: 1rem;
	padding-right: 1rem;
	font-family: inherit;
	:disabled {
		background-color: #e5e5e5;
	}
`;

export const MFile = styled.input.attrs({ type: "file" })`
	color: #878787;
	font-family: inherit;
`;

export const MButtons = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
	justify-content: end;
`;

interface btnProps {
	isCancel?: boolean;
}

export const MButton = styled.button<btnProps>`
	padding: 0.6rem;
	border-radius: ${({ theme }) => theme.borderRadius};
	color: white;
	border: none;
	background-color: ${({ theme, isCancel }) =>
		isCancel ? "grey" : theme.colors.main};
	cursor: pointer;
	&:disabled {
		opacity: 0.5;
	}
`;
