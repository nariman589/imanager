import { Input } from "components/layouts/NavBar/HeaderSearch/components";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Document, HrAllReq, SapEvents } from "types/CabinetTypes";
import { ReactComponent as Loupe } from "assets/coloredLoupe.svg";
import { ReactComponent as Excel } from "assets/excel.svg";
import { ReactComponent as Doc } from "assets/doc.svg";
import { ReactComponent as PDF } from "assets/pdf.svg";
import { Loader } from "components/ui/Loader/Loader";
import agent from "components/api/agent";
import { saveAs } from "file-saver";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import Modal from "components/ui/Modal/Modal";
import {
	MBody,
	MButton,
	MButtons,
	MFile,
	MInput,
	MInputWrapper,
	MOption,
	MOptions,
	MTitle,
} from "components/ui/Modal/components";
import { Checkbox } from "../SubstitutionPage/SubstitutionTable";
import { useAuth } from "components/hooks/useAuth";
import useDebounce from "components/hooks/useDebounce";
import { SubstituteListI } from "types/SubstituteTypes";
import { toast } from "react-toastify";
import { convertBase64 } from "components/utils/helpers";
import CreateDocModal from "./CreateDocModal";
import CheckQrModal from "./CheckQrModal";
import { RolesI } from "components/pages/ProfilePage/ProfilePage";

interface Props {
	params: HrAllReq;
	handleSubmit: any;
	setParams: React.Dispatch<React.SetStateAction<HrAllReq>>;
	isLoading: boolean;
	role: RolesI;
	isHr?: boolean;
}

function HrSearchParams({
	params,
	isLoading,
	handleSubmit,
	setParams,
	role,
	isHr,
}: Props) {
	const [excelLoading, setExcelLoading] = useState(false);

	const { open, setOpen, openRef } = useClickOutside();

	const {
		open: openQrModal,
		setOpen: setOpenQrModal,
		openRef: qrRef,
	} = useClickOutside();

	const getExcel = async () => {
		setExcelLoading(true);
		if (isHr) {
			const response = await agent.cabinetApi.hrExcell({
				role: params.role,
				status: params.status,
				tabNumber: String(params.employeeTabNumber),
				fromDate: params.fromDate,
				tab: params.empTab,
				toDate: params.toDate,
			});
			const blob = new Blob([response], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			saveAs(blob, "Документы ЛК");
		} else {
			const response = await agent.cabinetApi.accountingExcel({
				role: params.role,
				status: params.status,
				tabNumber: String(params.employeeTabNumber),
				fromDate: params.fromDate,
				tab: params.empTab,
				toDate: params.toDate,
			});
			const blob = new Blob([response], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			saveAs(blob, "Документы ЛК УУЗП");
		}
		setExcelLoading(false);
	};

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{openQrModal && (
				<CheckQrModal qrRef={qrRef} setOpenQrModal={setOpenQrModal} />
			)}
			{open && <CreateDocModal openRef={openRef} setOpen={setOpen} />}
			<FInputs>
				<FInputWrapper>
					<FLabel htmlFor="status">Статус</FLabel>
					<FSelect
						id="status"
						onChange={(e) =>
							setParams((v) => ({ ...v, status: Number(e.target.value) }))
						}
					>
						<FOption value={0}>В работе</FOption>
						<FOption value={1}>Архив</FOption>
					</FSelect>
				</FInputWrapper>
				<FInputWrapper>
					<FLabel htmlFor="tabNumber">Таб. номер</FLabel>
					<FInput
						id="tabNumber"
						type="number"
						value={params.empTab}
						onChange={(e) =>
							setParams((v) => ({ ...v, empTab: Number(e.target.value) }))
						}
					/>
				</FInputWrapper>
				<FInputWrapper>
					<FLabel htmlFor="dataS">Дата приказа с</FLabel>
					<FInput
						id="dataS"
						type="date"
						value={params.fromDate}
						onChange={(e) =>
							setParams((v) => ({
								...v,
								fromDate: e.target.value || undefined,
							}))
						}
					/>
				</FInputWrapper>
				<FInputWrapper>
					<FLabel htmlFor="dataE">по </FLabel>
					<FInput
						id="dataE"
						type="date"
						value={params.toDate}
						onChange={(e) =>
							setParams((v) => ({ ...v, toDate: e.target.value || undefined }))
						}
					/>
				</FInputWrapper>
			</FInputs>
			<FButtons>
				<FButton type="submit" disabled={isLoading}>
					Поиск {isLoading ? <Loader /> : <Loupe />}
				</FButton>
				<FButton excel disabled={excelLoading || isLoading} onClick={getExcel}>
					Excel {excelLoading || isLoading ? <Loader /> : <Excel />}
				</FButton>
				{role === "hr" && (
					<>
						<FButton type="button" onClick={() => setOpen(true)}>
							Добавить приказ/документ <Doc />
						</FButton>
						<FButton type="button" onClick={() => setOpenQrModal(true)}>
							Предпросмотр QR кода <PDF />
						</FButton>
					</>
				)}
			</FButtons>
		</Form>
	);
}

const FInputs = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

interface btnProps {
	excel?: boolean;
}

const FButtons = styled.div`
	margin-top: 2rem;
	display: flex;
	gap: 1rem;
`;
const FButton = styled.button<btnProps>`
	display: flex;
	gap: 0.5rem;
	padding: 1rem;
	width: max-content;
	/* max-w */
	align-items: center;
	border-radius: ${({ theme }) => theme.borderRadius};
	border: none;
	outline: none;
	cursor: pointer;
	transition: 0.2s;
	svg {
		width: 1rem;
		height: 1rem;
	}
	:hover {
		color: white;
		background-color: ${({ theme }) => theme.colors.main};
		svg {
			fill: ${({ excel }) => (excel ? "none" : "white")};
		}
	}
`;

const FSelect = styled.select`
	outline: none;
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

const FOption = styled.option``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const FInputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
`;

const FLabel = styled.label`
	font-size: 0.8rem;
`;

const FInput = styled.input`
	border: none;
	outline: none;
	font-family: inherit;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export default HrSearchParams;
