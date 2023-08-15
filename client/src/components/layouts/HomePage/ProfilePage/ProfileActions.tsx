import { ElementsContainer } from "components/pages/MainPage/components";
import React from "react";
import styled from "styled-components";
import { Button, Wrapper } from "../SubstitutionPage/SubstitutionActions";
import { ReactComponent as PersonalCabinet } from "assets/personalCabinet.svg";
import { ReactComponent as HrCabinet } from "assets/hr.svg";
import { ReactComponent as AccountingCabinet } from "assets/accounting.svg";
import { RolesI } from "components/pages/ProfilePage/ProfilePage";

interface Props {
	setCabinet: React.Dispatch<React.SetStateAction<RolesI>>;
	activeCabinet: RolesI;
	isHr?: boolean;
	isHrHead?: boolean;
	isHrChief?: boolean;
	isAccouning?: boolean;
}

function ProfileActions({
	isHr,
	isHrHead,
	isHrChief,
	isAccouning,
	activeCabinet,
	setCabinet,
}: Props) {
	const getActiveCabinet = (): RolesI => {
		if (isHrChief) return "hrChief";
		if (isHrHead) return "hrHead";
		return "hr";
	};
	return (
		<ElementsContainer>
			<Wrapper>
				<Button
					isActive={activeCabinet === "personal"}
					onClick={() => setCabinet("personal")}
				>
					Личный кабинет <PersonalCabinet />
				</Button>
				{isHr && (
					<Button
						isActive={
							activeCabinet === "hr" ||
							activeCabinet === "hrHead" ||
							activeCabinet === "hrChief"
						}
						onClick={() => setCabinet(getActiveCabinet())}
					>
						Личный кабинет кадровой службы <HrCabinet />
					</Button>
				)}
				{isAccouning && (
					<Button
						isActive={activeCabinet === "accounting"}
						onClick={() => setCabinet("accounting")}
					>
						Личный кабинет работника УУЗП ДУАХО <AccountingCabinet />
					</Button>
				)}
			</Wrapper>
		</ElementsContainer>
	);
}

export default ProfileActions;
