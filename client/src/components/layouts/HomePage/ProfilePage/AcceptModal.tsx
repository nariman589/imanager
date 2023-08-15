import agent from "components/api/agent";
import { useAuth } from "components/hooks/useAuth";
import { Loader } from "components/ui/Loader/Loader";
import {
	MTitle,
	MBody,
	MInputWrapper,
	MButtons,
	MButton,
} from "components/ui/Modal/components";
import Modal from "components/ui/Modal/Modal";
import React, { useState } from "react";
interface Props {
	id: string;
	setOpenAccept: React.Dispatch<React.SetStateAction<boolean>>;
	acceptRef: React.MutableRefObject<any>;
	updateData: any;
}
function AcceptModal({ acceptRef, id, setOpenAccept, updateData }: Props) {
	const [loading, setLoading] = useState(false);

	const { user } = useAuth();

	const accept = async () => {
		setLoading(true);
		await agent.cabinetApi.hrConfirm({
			id: id,
			execTabNum: user?.employeeTabNumber,
		});
		updateData();
		setLoading(false);
		setOpenAccept(false);
	};

	return (
		<Modal openRef={acceptRef} onClick={() => setOpenAccept(false)}>
			{" "}
			<MTitle>Подтверждение документа</MTitle>
			<MBody>
				<MButtons>
					<MButton disabled={loading} onClick={accept}>
						Подтвердить {loading && <Loader />}
					</MButton>
					<MButton>Отмена</MButton>
				</MButtons>
			</MBody>
		</Modal>
	);
}

export default AcceptModal;
