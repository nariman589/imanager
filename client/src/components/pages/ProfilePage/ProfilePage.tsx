import { useAuth } from "components/hooks/useAuth";
import ProfileActions from "components/layouts/HomePage/ProfilePage/ProfileActions";
import ProfileMessages from "components/layouts/HomePage/ProfilePage/ProfileMessages";
import React, { useState } from "react";
import { PageWrapper } from "../MainPage/components";

export type RolesI = "personal" | "hr" | "hrHead" | "hrChief" | "accounting";

function ProfilePage() {
	const { user } = useAuth();
	const roles = user?.employeeRole;
	const isHr = roles?.includes("Hr");
	const isHrHead = roles?.includes("HrHead");
	const isHrChief = roles?.includes("HrChief");
	const isAccounting = roles?.includes("HrAccounting");

	const isHaveRoles = isHr || isHrHead || isHrChief || isAccounting;

	const [choosenCabinet, setChoosenCabinet] = useState<RolesI>("personal");

	if (isHaveRoles)
		return (
			<PageWrapper>
				<ProfileActions
					isHr={isHr}
					isHrHead={isHrHead}
					isHrChief={isHrChief}
					isAccouning={isAccounting}
					setCabinet={setChoosenCabinet}
					activeCabinet={choosenCabinet}
				/>
				<ProfileMessages activeCabinet={choosenCabinet} />
			</PageWrapper>
		);

	return <ProfileMessages activeCabinet="personal" />;
}

export default ProfilePage;
