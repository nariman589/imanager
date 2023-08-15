import { useAuth } from "components/hooks/useAuth";
import { ElementsContainer, Title } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import { parseByParents } from "components/utils/helpers";
import { PROCESSES } from "components/variables/urlVariables";

import { Button, ListWrapper, ProccessElement, Text } from "./components";

function Processes() {
	const { processesList, processesLoading } = useAuth();

	return (
		<ElementsContainer>
			<Title>Процессы {processesLoading && <Loader />}</Title>
			<ListWrapper>
				{parseByParents(processesList)
					?.slice(0, 4)
					.map((item, index) => (
						<ProccessElement
							key={item.name + index}
							to={`processes/${item.name}`}
						>
							<Text>{item.description}</Text>
						</ProccessElement>
					))}
			</ListWrapper>
			<Button to={PROCESSES}>Все процессы</Button>
		</ElementsContainer>
	);
}

export default Processes;
