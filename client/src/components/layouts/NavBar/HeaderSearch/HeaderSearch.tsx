import React, { useState } from "react";
import loupe from "assets/loupe.svg";
import {
	SearchWrapper,
	Input,
	Loupe,
	SearchResult,
	SearchItem,
} from "./components";
import { Loader } from "components/ui/Loader/Loader";
import { useAuth } from "components/hooks/useAuth";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import agent from "components/api/agent";

function HeaderSearch() {
	const { processesList, processesLoading } = useAuth();
	const { open, setOpen, openRef } = useClickOutside();
	const [value, setValue] = useState("");

	return (
		<SearchWrapper ref={openRef} onClick={() => setOpen(true)}>
			<Input
				placeholder="Поиск процессов..."
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{processesLoading ? <Loader /> : <Loupe src={loupe} />}
			{open && (
				<SearchResult>
					{processesList
						?.filter((i) => i.link && i.description.includes(value))
						.map((item) => (
							<SearchItem
								onClick={() =>
									agent.oftenUsedApi.increaseOftenUsedCount({ id: item.id })
								}
								href={item.link}
								target="_blank"
							>
								{item.description}
							</SearchItem>
						))}
				</SearchResult>
			)}
		</SearchWrapper>
	);
}

export default HeaderSearch;
