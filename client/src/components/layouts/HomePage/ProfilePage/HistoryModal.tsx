import agent from "components/api/agent";
import { Loader } from "components/ui/Loader/Loader";
import { MTitle } from "components/ui/Modal/components";
import Modal from "components/ui/Modal/Modal";
import { TableStyled } from "components/ui/Table/Table";
import { convertDate } from "components/utils/helpers";
import React, { useEffect, useState } from "react";
import { Event } from "types/CabinetTypes";

interface Props {
	id: string;
	setOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
	historyRef: React.MutableRefObject<any>;
}

function HistoryModal({ id, setOpenHistory, historyRef }: Props) {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(false);

	const getEvents = async () => {
		setLoading(true);
		setEvents((await agent.cabinetApi.getEvents(id)).value.events);
		setLoading(false);
	};

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<Modal openRef={historyRef} onClick={() => setOpenHistory(false)}>
			<MTitle>История{loading && <Loader />}</MTitle>
			<TableStyled>
				<thead>
					<tr>
						<th>ФИО</th>
						<th>Действие</th>
						<th>Комментарий</th>
						<th>Время</th>
					</tr>
				</thead>
				<tbody>
					{events.map((event, index) => (
						<tr key={index}>
							<td>{event.employeeFullName}</td>
							<td>{event.eventName}</td>
							<td>{event.comment}</td>
							<td>{convertDate(event.createTime)}</td>
						</tr>
					))}
				</tbody>
			</TableStyled>
		</Modal>
	);
}

export default HistoryModal;
