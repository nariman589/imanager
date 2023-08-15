import agent from "components/api/agent";
import { parseByParents } from "components/utils/helpers";
import Accordeon from "components/ui/Accordeon/Accordeon";
import { ElementsContainer, Title } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import { useEffect, useState } from "react";
import { MenuListI } from "types/MenuTypes";
import { ListWrapper } from "../../MainPage/Processes/components";

interface Props {
	message: MenuListI | null;
	setMessage: any;
}

const Messages = ({ message, setMessage }: Props) => {
	const [messagesList, setMessagesList] = useState<MenuListI[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const getMessages = async () => {
		setIsLoading(true);
		setMessagesList((await agent.menuApi.getMenuByType(1)).value);
		setIsLoading(false);
	};

	useEffect(() => {
		getMessages();
	}, []);

	return (
		<ElementsContainer>
			<Title>Мои заявки {isLoading && <Loader />}</Title>
			<ListWrapper>
				{parseByParents(messagesList)
					?.slice(1)
					?.map((item, index) => (
						<Accordeon
							key={item.name + index}
							data={item}
							process={message}
							setProcess={setMessage}
						/>
					))}
			</ListWrapper>
		</ElementsContainer>
	);
};

export default Messages;
