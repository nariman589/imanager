import React, { useState } from "react";
import {
	ProfileWrapper,
	Image,
	InfoWrapper,
	FullName,
	PositionName,
} from "./components";
import PersonInfoModal from "components/ui/Modal/PersonInfoModal";
import { useAuth } from "components/hooks/useAuth";
import { useClickOutside } from "components/hooks/clickOutsideHook";

function Profile() {
	const { open, setOpen, openRef } = useClickOutside();
	const { user } = useAuth();

	return (
		<ProfileWrapper onClick={() => setOpen(true)}>
			{open && (
				<PersonInfoModal
					openRef={openRef}
					onClick={(e: any) => {
						e.stopPropagation();
						setOpen(false);
					}}
				/>
			)}
			<Image src={user?.employeePhotoUrl} />
			<InfoWrapper>
				<FullName>{user?.employeeFullName}</FullName>
				<PositionName>{user?.employeePositionName}</PositionName>
			</InfoWrapper>
		</ProfileWrapper>
	);
}

export default Profile;
