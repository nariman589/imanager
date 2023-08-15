import agent from "components/api/agent";
import { increaseProccesCount } from "components/utils/helpers";
import { ElementsContainer, Title } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import React, { useEffect, useState } from "react";
import { OftetUsedListI } from "types/OftenUsedTypes";

import { ListElement, OffenUsedList } from "./components";

function OftenUsedDashboard() {
	const [oftenUsedList, setOftenUsedList] = useState<OftetUsedListI[] | null>(
		null
	);

	const [loading, setLoading] = useState(false);

	const getList = async () => {
		setLoading(true);
		setOftenUsedList((await agent.oftenUsedApi.getOftenUsed()).value);
		setLoading(false);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<ElementsContainer>
			<Title>Часто используемые процессы {loading && <Loader />}</Title>
			<OffenUsedList>
				{oftenUsedList?.map((item, index) => (
					<ListElement
						key={item.name + index}
						target="_blank"
						href={item.link}
						onClick={() => increaseProccesCount(item.id)}
					>
						{item.name}
					</ListElement>
				))}
			</OffenUsedList>
		</ElementsContainer>
	);
}

export default OftenUsedDashboard;
