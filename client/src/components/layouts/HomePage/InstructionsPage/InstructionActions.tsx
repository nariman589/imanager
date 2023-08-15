import agent from "components/api/agent";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import { useAuth } from "components/hooks/useAuth";
import { ElementsContainer } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import Modal from "components/ui/Modal/Modal";
import React, { ChangeEvent, useState } from "react";
import { ReactComponent as Update } from "assets/update.svg";
import { ReactComponent as Add } from "assets/addInst.svg";
import moment from "moment";
import {
	MTitle,
	MBody,
	MInputWrapper,
	MInput,
	MFile,
	MButtons,
	MButton,
} from "components/ui/Modal/components";
import { Button, Wrapper } from "../SubstitutionPage/SubstitutionActions";

function InstructionActions() {
	const { user, getInstructions } = useAuth();

	const { open, setOpen, openRef } = useClickOutside();

	const [addLoading, setAddLoading] = useState(false);
	const [fileLoading, setFileLoading] = useState(false);

	const [insturctionValues, setInstructionValues] = useState({
		instructionName: "",
		instructionBranch: user?.employeeBranchName,
		instructionUrl: "",
		whoAdded: user?.employeeFullName,
		whenAdded: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
		whoChanged: user?.employeeFullName,
		whenChanged: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
		isActual: true,
	});

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = (e?.target?.files && e?.target?.files[0]) || "";
		const formData = new FormData();
		formData.append("File", file);
		setFileLoading(true);
		const { Data } = await agent.fileApi.postFile(formData);
		setInstructionValues((v) => ({
			...v,
			instructionUrl: Data.FileUrl,
		}));
		setFileLoading(false);
	};

	const handleAdd = async () => {
		setAddLoading(true);
		await agent.instuctionsApi.add(insturctionValues);
		setAddLoading(false);
		setOpen(false);
		getInstructions && getInstructions(true);
	};

	return (
		<ElementsContainer>
			{open && (
				<Modal openRef={openRef} onClick={() => setOpen(false)}>
					<MTitle>Добавление инструкции</MTitle>
					<MBody>
						<MInputWrapper>
							<label>Наименование:</label>
							<MInput
								value={insturctionValues.instructionName}
								onChange={(e) =>
									setInstructionValues((v) => ({
										...v,
										instructionName: e.target.value,
									}))
								}
							/>
						</MInputWrapper>
						<MInputWrapper>
							<label>Файл</label>
							<MFile onChange={handleFileChange} />
						</MInputWrapper>
						<MButtons>
							<MButton onClick={handleAdd} disabled={addLoading || fileLoading}>
								Добавить {(addLoading || fileLoading) && <Loader />}
							</MButton>
							<MButton
								isCancel
								disabled={addLoading}
								onClick={() => setOpen(false)}
							>
								Отмена {addLoading && <Loader />}
							</MButton>
						</MButtons>
					</MBody>
				</Modal>
			)}
			<Wrapper>
				<Button onClick={() => getInstructions && getInstructions(true)}>
					Обновить <Update />
				</Button>
				<Button onClick={() => setOpen(true)}>
					Добавить <Add />
				</Button>
			</Wrapper>
		</ElementsContainer>
	);
}

export default InstructionActions;
