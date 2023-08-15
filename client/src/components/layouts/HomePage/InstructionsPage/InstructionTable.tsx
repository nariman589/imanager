import agent from "components/api/agent";
import { useAuth } from "components/hooks/useAuth";
import { ElementsContainer } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import Table from "components/ui/Table/Table";
import { TBodyProps, TBodyValues } from "components/ui/Table/TableTypes";
import { ReactComponent as Remove } from "assets/deleteInst.svg";
import { ReactComponent as UpdateInst } from "assets/updateInst.svg";
import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { InstructionList } from "types/InstructionTypes";
import Modal from "components/ui/Modal/Modal";
import { useClickOutside } from "components/hooks/clickOutsideHook";

import moment from "moment";
import {
	MButtons,
	MButton,
	MBody,
	MInputWrapper,
	MInput,
	MFile,
	MTitle,
} from "components/ui/Modal/components";

function InstructionTable() {
	const { instructionsList, instructionsLoading, user } = useAuth();

	const isInsturctionAdmin = user?.employeeRole?.includes("InstructionsAdmin");

	const generateBodyForTable = (
		list: any,
		namesList: TBodyValues[]
	): TBodyProps[] => {
		if (!list) return [];

		return list.map((item: any) => ({
			link: item.instructionUrl,
			isOpened: true,
			item: item,
			values: namesList.map((value) => ({
				...value,
				name: item[value.name],
			})),
		}));
	};

	if (instructionsLoading)
		return (
			<ElementsContainer>
				<Loader />
			</ElementsContainer>
		);
	const headers = [
		{
			name: "Наименование",
			filterType: undefined,
		},
		{
			name: "Владелец документа",
			filterType: undefined,
		},
		{
			name: "Создал(а)",
			filterType: undefined,
		},
		{
			name: "Дата и время создания",
			filterType: undefined,
		},
		{
			name: "Редактировал(а)",
			filterType: undefined,
		},
		{
			name: "Дата и время редактирования",
			filterType: undefined,
		},
	];

	const body: TBodyValues[] = [
		{ name: "instructionName" },
		{ name: "instructionBranch" },
		{ name: "whoAdded" },
		{ name: "whenAdded", type: "Date" },
		{ name: "whoChanged" },
		{ name: "whenChanged", type: "Date" },
	];
	return (
		<ElementsContainer>
			<Table
				enableSearch
				enableActions={isInsturctionAdmin}
				actions={(data) => <Actions data={data} />}
				data={generateBodyForTable(instructionsList, body)}
				headers={headers}
			/>
		</ElementsContainer>
	);
}

interface ActionProps {
	data: TBodyProps;
}

const Actions = ({ data }: ActionProps) => {
	const { user, getInstructions } = useAuth();

	const [deletionLoading, setDeletionLoading] = useState(false);
	const [updatingLoading, setUpdatingLoading] = useState(false);
	const [fileLoading, setFileLoading] = useState(false);

	const [updatingInstruction, setUpdatingInstruction] =
		useState<InstructionList | null>(null);

	const {
		open: needUpdate,
		setOpen: setNeedUpdate,
		openRef,
	} = useClickOutside();

	const {
		open: needDeletion,
		setOpen: setNeedDeletion,
		openRef: delRef,
	} = useClickOutside();

	const handleUpdateClick = () => {
		setNeedUpdate(true);
		setUpdatingInstruction(data?.item);
	};

	const handleDeletion = async () => {
		setDeletionLoading(true);
		await agent.instuctionsApi.delete(data?.item?.instructionId);
		setDeletionLoading(false);
		setNeedDeletion(false);
		getInstructions && getInstructions(true);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUpdatingInstruction((v) => ({ ...v, instructionName: e.target.value }));
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = (e?.target?.files && e?.target?.files[0]) || "";
		const formData = new FormData();
		formData.append("File", file);
		setFileLoading(true);
		const { Data } = await agent.fileApi.postFile(formData);
		setUpdatingInstruction((v) => ({
			...v,
			instructionUrl: Data.FileUrl,
		}));
		setFileLoading(false);
	};

	const handleUpdate = async () => {
		setUpdatingLoading(true);
		await agent.instuctionsApi.update({
			instructionBranch: updatingInstruction?.instructionBranch,
			instructionId: updatingInstruction?.instructionId,
			instructionName: updatingInstruction?.instructionName,
			instructionUrl: updatingInstruction?.instructionUrl,
			whenChanged: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
			whoChanged: user?.employeeFullName,
		});
		getInstructions && getInstructions(true);
		setNeedUpdate(false);
		setUpdatingLoading(false);
	};

	return (
		<ActionButtons>
			{needDeletion && (
				<Modal openRef={delRef} onClick={() => setNeedDeletion(false)}>
					<MTitle>
						Вы подтверждаете удаление {data?.item?.instructionName} ?
					</MTitle>
					<MButtons>
						<MButton onClick={handleDeletion} disabled={deletionLoading}>
							Да {deletionLoading && <Loader />}
						</MButton>
						<MButton
							isCancel
							onClick={() => setNeedDeletion(false)}
							disabled={deletionLoading}
						>
							Отмена {deletionLoading && <Loader />}
						</MButton>
					</MButtons>
				</Modal>
			)}
			{needUpdate && (
				<Modal openRef={openRef} onClick={() => setNeedUpdate(false)}>
					<MTitle>Изменение инструкции</MTitle>
					<MBody>
						<MInputWrapper>
							<label>Наименование:</label>
							<MInput
								value={updatingInstruction?.instructionName}
								onChange={handleNameChange}
							/>
						</MInputWrapper>
						<MInputWrapper>
							<label>Файл</label>
							<MFile onChange={handleFileChange} />
						</MInputWrapper>
						<MButtons>
							<MButton
								onClick={handleUpdate}
								disabled={updatingLoading || fileLoading}
							>
								Изменить {(updatingLoading || fileLoading) && <Loader />}
							</MButton>
							<MButton
								isCancel
								onClick={() => setNeedUpdate(false)}
								disabled={updatingLoading}
							>
								Отмена {updatingLoading && <Loader />}
							</MButton>
						</MButtons>
					</MBody>
				</Modal>
			)}
			<UpdateInst title="Изменить" onClick={handleUpdateClick} />
			<Remove title="Удалить" onClick={() => setNeedDeletion(true)} />
		</ActionButtons>
	);
};

const ActionButtons = styled.div`
	display: flex;
	justify-content: space-between;
	svg {
		width: 1.3rem;
		height: 1.3rem;
		cursor: pointer;
	}
`;

export default InstructionTable;
