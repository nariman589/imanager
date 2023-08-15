import { useClickOutside } from "components/hooks/clickOutsideHook";
import React from "react";
import styled from "styled-components";
import { filterType } from "components/ui/Table/TableTypes";

interface Props {
	name: string;
	filterType?: filterType;
	setFilter?: any;
}

function TableHeader({ name, filterType, setFilter }: Props) {
	const { open, setOpen, openRef } = useClickOutside();

	const handleFilter = () => {
		setOpen((v) => !v);
	};
	return (
		<th onClick={handleFilter} ref={openRef}>
			{name}
			{open && <div>Фильтр</div>}
		</th>
	);
}

export default TableHeader;
