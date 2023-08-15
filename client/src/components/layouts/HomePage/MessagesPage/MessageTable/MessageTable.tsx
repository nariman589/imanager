import agent from "components/api/agent";
import { useAuth } from "components/hooks/useAuth";
import { ElementsContainer } from "components/pages/MainPage/components";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { MenuListI } from "types/MenuTypes";
import { MessagesArchiveI, MessagesI } from "types/MessagesTypes";
import Table from "../../../../ui/Table/Table";
import { TBodyProps } from "components/ui/Table/TableTypes";
import { getLinkTypeAndDataToTable } from "components/utils/messagesTablData";
import { generateBodyForTable } from "components/utils/helpers";
import { Loader } from "components/ui/Loader/Loader";
import HistoryModalMessages from "./HistoryModalMessages";

interface Props {
	message: MenuListI | null;
}

function MessageTable({ message }: Props) {
	const [messagesList, setMessagesList] = useState<
		MessagesI[] | MessagesArchiveI[] | null
	>(null);

	const [isLoading, setIsLoading] = useState(false);

	const { user } = useAuth();

	const { link, isArchive, tHeaderList, tBodyList } =
		getLinkTypeAndDataToTable(message);

	const handleMessageClick = (task: TBodyProps) => {
		agent.messagesFolderApi.setOpened(task.guid, user?.employeeLogin);
	};

	const getList = async () => {
		setIsLoading(true);
		if (isArchive) {
			setMessagesList(
				(
					await agent.messagesFolderApi.getMessages<MessagesArchiveI[]>(
						link,
						user?.employeeLogin
					)
				).value
			);
		} else
			setMessagesList(
				(
					await agent.messagesFolderApi.getMessages<MessagesI[]>(
						link,
						user?.employeeLogin
					)
				).value
			);
		setIsLoading(false);
	};

	useEffect(() => {
		if (message) getList();
	}, [message]);

	if (!message)
		return (
			<ElementsContainer>
				<TypeAnimation
					sequence={["Выберите процесс", 3000]}
					wrapper="div"
					cursor={true}
					repeat={0}
					style={{ fontSize: "2em" }}
				/>
			</ElementsContainer>
		);
	if (isLoading) return <Loader />;
	return (
		<ElementsContainer>
			<Table
				headers={tHeaderList}
				data={generateBodyForTable<MessagesI | MessagesArchiveI>(
					messagesList,
					tBodyList,
					isArchive
				)}
				showHistory={isArchive}
				onClick={handleMessageClick}
				enableSearch
				enableActions
				actions={(data) => <HistoryModalMessages id={data?.guid} />}
			/>
		</ElementsContainer>
	);
}

export default MessageTable;
