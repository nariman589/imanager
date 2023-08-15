import agent from "components/api/agent";
import { useAuth } from "components/hooks/useAuth";
import { Loader } from "components/ui/Loader/Loader";
import {
	MBody,
	MButton,
	MButtons,
	MInputWrapper,
	MTitle,
} from "components/ui/Modal/components";
import Modal from "components/ui/Modal/Modal";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
	id: string;
	setOpenReject: React.Dispatch<React.SetStateAction<boolean>>;
	rejectRef: React.MutableRefObject<any>;
	isRevoke?: boolean;
	updateData: any;
}

function RejRevModal({
	id,
	rejectRef,
	setOpenReject,
	isRevoke,
	updateData,
}: Props) {
	const [loading, setLoading] = useState(false);
	const [comment, setComment] = useState("");

	const { user } = useAuth();

	const reject = async () => {
		setLoading(true);
		if (isRevoke) await agent.cabinetApi.revoke(id, user?.employeeTabNumber);
		else await agent.cabinetApi.reject(id, comment, user?.employeeTabNumber);
		updateData();
		setOpenReject(false);
		setLoading(false);
	};

	return (
		<Modal openRef={rejectRef} onClick={() => setOpenReject(false)}>
			<MTitle>{isRevoke ? "Отзыв документа" : "Отклонение документа"}</MTitle>
			<MBody>
				{!isRevoke && (
					<MInputWrapper>
						<label>Комментарий</label>
						<TextArea onChange={(e) => setComment(e.target.value)} />
					</MInputWrapper>
				)}
				<MButtons>
					<MButton disabled={loading} onClick={reject}>
						{isRevoke ? "Отозвать" : "Отклонить"} {loading && <Loader />}
					</MButton>
					<MButton>Отмена</MButton>
				</MButtons>
			</MBody>
		</Modal>
	);
}

export const TextArea = styled.textarea`
	min-height: 8rem;
`;

export default RejRevModal;
