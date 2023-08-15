import React from "react";
import { CloseIcon, ModalBackground, ModalWrapper } from "./components";
import closeIcon from "assets/closeIcon.svg";

interface Props {
	children?: React.ReactNode;
	onClick?: any;
	openRef?: React.MutableRefObject<any>;
}

function Modal({ children, onClick, openRef }: Props) {
	return (
		<ModalBackground>
			<ModalWrapper ref={openRef}>
				<CloseIcon onClick={onClick} src={closeIcon} />
				{children}
			</ModalWrapper>
		</ModalBackground>
	);
}

export default Modal;
