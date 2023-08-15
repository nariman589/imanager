import Messages from "components/layouts/HomePage/MessagesPage/MessagesList/Messages";
import MessageTable from "components/layouts/HomePage/MessagesPage/MessageTable/MessageTable";
import React, { useState } from "react";
import { MenuListI } from "types/MenuTypes";
import { PageWrapper } from "../MainPage/components";

function MessagePage() {
	const [active, setActive] = useState<MenuListI | null>(null);
	return (
		<PageWrapper>
			<Messages message={active} setMessage={setActive} />
			<MessageTable message={active} />
		</PageWrapper>
	);
}

export default MessagePage;
