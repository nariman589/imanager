import agent from "components/api/agent";
import { parseByParents } from "components/utils/helpers";
import { useAuth } from "components/hooks/useAuth";
import Accordeon from "components/ui/Accordeon/Accordeon";
import { ElementsContainer, Title } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import { MenuListI } from "types/MenuTypes";
import { ListWrapper } from "../../MainPage/Processes/components";

interface Props {
	process: MenuListI | null;
	setProcess: any;
}

const ProcessesList = ({ process, setProcess }: Props) => {
	const { processesList, processesLoading } = useAuth();

	return (
		<ElementsContainer>
			<Title>Процессы {processesLoading && <Loader />}</Title>
			<ListWrapper>
				{parseByParents(processesList)?.map((item, index) => (
					<Accordeon
						key={item.name + index}
						data={item}
						process={process}
						setProcess={setProcess}
					/>
				))}
			</ListWrapper>
		</ElementsContainer>
	);
};

export default ProcessesList;
