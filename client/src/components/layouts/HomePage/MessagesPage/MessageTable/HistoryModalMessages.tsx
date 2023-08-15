import React, { useState } from "react";
import { ReactComponent as HistoryIcon } from "assets/history.svg";
import styled from "styled-components";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import Modal from "components/ui/Modal/Modal";
import { MBody, MTitle } from "components/ui/Modal/components";
import { TableStyled } from "components/ui/Table/Table";
import { HistoryProps } from "types/HistoryTypes";
import agent from "components/api/agent";
import { Loader } from "components/ui/Loader/Loader";
import { convertDate, isOldDate } from "components/utils/helpers";

interface Props {
	id: string;
}

function HistoryModalMessages({ id }: Props) {
	const { open, setOpen, openRef } = useClickOutside();
	const [historyData, setHistoryData] = useState<HistoryProps[]>([]);
	const [loading, setLoading] = useState(false);

	const getHistory = async () => {
		setLoading(true);
		setHistoryData((await agent.historyApi.getById(id)).value);
		setLoading(false);
		setOpen(true);
	};

	const convertSecToDate = (sec: string) => {
		if (!sec) return "";
		const seconds = Number(sec);
		const d = Math.floor(seconds / (3600 * 24));
		const h = Math.floor((seconds % (3600 * 24)) / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = Math.floor(seconds % 60);
		const dDisplay = d > 0 ? d + " д. " : "";
		const hDisplay = h > 0 ? h + " ч. " : "";
		const mDisplay = m > 0 ? m + " мин. " : "";
		const sDisplay = s > 0 ? s + " с" : "";
		return dDisplay + hDisplay + mDisplay + sDisplay;
	};

	const statusName = (id: string) => {
		if (id === "1") return "Обработан";
		return "В ожидании ответа";
	};

	return (
		<HistoryWrapper>
			{loading ? (
				<Loader />
			) : (
				<HistoryIcon
					title="История"
					onClick={() => {
						getHistory();
					}}
				/>
			)}
			{open && (
				<Modal onClick={() => setOpen(false)} openRef={openRef}>
					<MTitle>История документа</MTitle>
					<MBody>
						<TableStyled>
							<thead>
								<tr>
									<th>Время поступления</th>
									<th>Стадия(Этап)</th>
									<th>Исполнитель</th>
									<th>Должность</th>
									<th>Время отклика</th>
									<th>Статус</th>
									<th>Время простоя</th>
									<th>Пользователь</th>
								</tr>
							</thead>
							<tbody>
								{historyData.map((item) => (
									<tr>
										<td>{convertDate(item?.messagE_DATE)}</td>
										<td>{item?.messagE_COMMENT}</td>
										<td>{item?.executoR_NAME}</td>
										<td>{item?.employeePositionName}</td>
										<td>
											{isOldDate(item?.replY_DATE)
												? "Нет отклика"
												: convertDate(item?.replY_DATE)}
										</td>
										<td>{statusName(item?.responsE_RECEIVED)}</td>
										<td>{convertSecToDate(item?.waiT_SEC)}</td>
										<td>{item?.useR_NAME}</td>
									</tr>
								))}
							</tbody>
						</TableStyled>
					</MBody>
				</Modal>
			)}
		</HistoryWrapper>
	);
}

const HistoryWrapper = styled.div`
	display: flex;
	justify-content: center;
	svg {
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}
`;

export default HistoryModalMessages;
