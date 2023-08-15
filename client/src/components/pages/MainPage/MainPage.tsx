import Banner from "components/layouts/HomePage/Banner/Banner";
import { PageWrapper } from "components/pages/MainPage/components";
import OffenUsedDashboard from "components/layouts/HomePage/MainPage/OffenUsedDashboard/OftenUsedDashboard";
import React from "react";
import Processes from "components/layouts/HomePage/MainPage/Processes/Processes";

function MainPage() {
	return (
		<>
			<Banner />
			<PageWrapper>
				<Processes />
				<OffenUsedDashboard />
			</PageWrapper>
		</>
	);
}

export default MainPage;
