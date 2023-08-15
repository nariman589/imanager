import agent from "components/api/agent";
import { useAuth } from "components/hooks/useAuth";
import SubstitutionActions from "components/layouts/HomePage/SubstitutionPage/SubstitutionActions";
import SubstitutionTable from "components/layouts/HomePage/SubstitutionPage/SubstitutionTable";
import React, { useEffect, useState } from "react";
import { SubstituteAllListI } from "types/SubstituteTypes";
import { PageWrapper } from "../MainPage/components";

function SubstitutionPage() {
	const [subList, setSubList] = useState<SubstituteAllListI[] | null>(null);
	const [choosenSubList, setChoosenSubList] = useState<SubstituteAllListI[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();

	const getList = async () => {
		setIsLoading(true);
		setSubList((await agent.substituteApi.getAll(user?.employeeLogin)).value);
		setIsLoading(false);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<PageWrapper>
			<SubstitutionActions update={getList} choosenList={choosenSubList} />
			<SubstitutionTable
				list={subList}
				choosenList={choosenSubList}
				setChoosen={setChoosenSubList}
				isLoading={isLoading}
			/>
		</PageWrapper>
	);
}

export default SubstitutionPage;
