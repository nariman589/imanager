import { RolesI } from "components/pages/ProfilePage/ProfilePage";
import { ReactComponent as Files } from "assets/seeFiles.svg";
import { ReactComponent as Sign } from "assets/sign.svg";
import { ReactComponent as Decline } from "assets/decline.svg";
import { ReactComponent as Accept } from "assets/accept.svg";
import { ReactComponent as History } from "assets/history.svg";
import { ReactComponent as Revoke } from "assets/revoke.svg";
import styled from "styled-components";
import React from "react";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import FilesModal from "./FilesModal";
import { TBodyProps } from "components/ui/Table/TableTypes";
import SignModal from "./SignModal";
import RejectModal from "./RejectModal";
import HistoryModal from "./HistoryModal";
import AcceptModal from "./AcceptModal";

interface Props {
	item: TBodyProps;
	role: RolesI;
	updateData: any;
}

function TableActions({ item, role, updateData }: Props) {
	const {
		open: showFiles,
		setOpen: setShowFiles,
		openRef: filesRef,
	} = useClickOutside();

	const {
		open: openSign,
		setOpen: setOpenSign,
		openRef: signRef,
	} = useClickOutside();

	const {
		open: openReject,
		setOpen: setOpenReject,
		openRef: rejectRef,
	} = useClickOutside();

	const {
		open: openHistory,
		setOpen: setOpenHistory,
		openRef: historyRef,
	} = useClickOutside();

	const {
		open: openAccept,
		setOpen: setOpenAccept,
		openRef: acceptRef,
	} = useClickOutside();

	if (role === "personal")
		return (
			<ActionsWrapper>
				{showFiles && (
					<FilesModal
						id={item?.item?.id}
						filesRef={filesRef}
						setShowFiles={setShowFiles}
					/>
				)}
				{openSign && (
					<SignModal
						doc={item.item}
						signRef={signRef}
						setOpenSign={setOpenSign}
						role={role}
						updateData={updateData}
					/>
				)}
				{openReject && (
					<RejectModal
						id={item.item.id}
						setOpenReject={setOpenReject}
						rejectRef={rejectRef}
						updateData={updateData}
					/>
				)}
				<Files title="Посмотреть вложения" onClick={() => setShowFiles(true)} />
				<Sign title="Подписать" onClick={() => setOpenSign(true)} />
				<Decline title="Отклонить" onClick={() => setOpenReject(true)} />
			</ActionsWrapper>
		);
	return (
		<ActionsWrapper>
			{openReject && (
				<RejectModal
					id={item.item.id}
					setOpenReject={setOpenReject}
					rejectRef={rejectRef}
					isRevoke
					updateData={updateData}
				/>
			)}
			{openSign && (
				<SignModal
					doc={item.item}
					signRef={signRef}
					setOpenSign={setOpenSign}
					role={role}
					updateData={updateData}
				/>
			)}
			{showFiles && (
				<FilesModal
					id={item?.item?.id}
					filesRef={filesRef}
					setShowFiles={setShowFiles}
				/>
			)}
			{openHistory && (
				<HistoryModal
					historyRef={historyRef}
					setOpenHistory={setOpenHistory}
					id={item.item.id}
				/>
			)}
			{openAccept && (
				<AcceptModal
					acceptRef={acceptRef}
					id={item.item.id}
					setOpenAccept={setOpenAccept}
					updateData={updateData}
				/>
			)}
			{role === "hrHead" && (
				<Accept title="Подтвердить" onClick={() => setOpenAccept(true)} />
			)}
			{role === "hrChief" && (
				<Sign title="Подписать" onClick={() => setOpenSign(true)} />
			)}
			{(item?.item?.statusCode === "CHIEF" ||
				item?.item?.statusCode === "HEAD") && (
				<Revoke title="Отозвать" onClick={() => setOpenReject(true)} />
			)}
			<Files title="Посмотреть вложения" onClick={() => setShowFiles(true)} />
			<History title="История документа" onClick={() => setOpenHistory(true)} />
		</ActionsWrapper>
	);
}

const ActionsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.2rem;
	svg {
		cursor: pointer;
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export default TableActions;
