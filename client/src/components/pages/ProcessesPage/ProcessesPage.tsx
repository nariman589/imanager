import InfoBlock from "components/layouts/HomePage/ProcessesPage/InfoBlock/InfoBlock";
import ProcessesList from "components/layouts/HomePage/ProcessesPage/Processes/Processes";
import React, { useState } from "react";
import { MenuListI } from "types/MenuTypes";
import { PageWrapper } from "../MainPage/components";

function ProcessesPage() {
	const [process, setProcess] = useState<MenuListI | null>(null);
	return (
		<PageWrapper>
			<ProcessesList setProcess={setProcess} process={process} />
			<InfoBlock process={process} />
		</PageWrapper>
	);
}

export default ProcessesPage;
