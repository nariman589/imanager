import { useAuth } from "components/hooks/useAuth";
import InstructionActions from "components/layouts/HomePage/InstructionsPage/InstructionActions";
import InstructionTable from "components/layouts/HomePage/InstructionsPage/InstructionTable";
import React from "react";
import { PageWrapper } from "../MainPage/components";

function InstructionsPage() {
	const { user } = useAuth();
	const employeeRole = user?.employeeRole;

	const isInsturctionAdmin = () => {
		return employeeRole?.includes("InstructionsAdmin");
	};
	if (isInsturctionAdmin())
		return (
			<PageWrapper>
				<InstructionActions />
				<InstructionTable />
			</PageWrapper>
		);

	return <InstructionTable />;
}

export default InstructionsPage;
