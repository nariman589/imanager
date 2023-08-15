import React, { useLayoutEffect, useRef, useState } from "react";
import {
	filterType,
	TBodyProps,
	THeaderProps,
} from "components/ui/Table/TableTypes";
import TableHeader from "./TableHeader";
import styled from "styled-components";
import { convertDate } from "components/utils/helpers";

interface Props {
	data: TBodyProps[];
	headers: THeaderProps[];
	handlePageFromOutside?: {
		page: number;
		totalPages?: number;
		setPage: any;
		total?: number;
	};
	enableActions?: boolean;
	actions?: (data: any) => JSX.Element;
	showHistory?: boolean;
	onClick?: any;
	enableSearch?: boolean;
}

function Table({
	data,
	headers,
	enableActions,
	handlePageFromOutside,
	actions,
	showHistory,
	onClick,
	enableSearch,
}: Props) {
	const initialFilters = {
		cellPerPage: 10,
		page: handlePageFromOutside ? handlePageFromOutside.page : 1,
		term: "",
		sortAlphabetIndex: null,
		sortDateIndex: null,
	};
	const [filters, setFilters] = useState(initialFilters);
	const dataLength = data.length;
	const focusRef = useRef<HTMLTableSectionElement>(null);

	const getMessagesByFilters = (filters: typeof initialFilters) => {
		return data
			.slice()
			.filter(
				(item) =>
					item.values.filter((value) =>
						value.name?.toLowerCase().includes(filters.term.toLowerCase())
					)?.length !== 0
			)
			.filter((item, index) =>
				!!handlePageFromOutside
					? true
					: index >= (filters.page - 1) * filters.cellPerPage &&
					  index < filters.page * filters.cellPerPage
			);
	};

	useLayoutEffect(() => {
		if (focusRef.current)
			focusRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "nearest",
			});
	}, [filters.page, handlePageFromOutside?.page]);

	return (
		<TableWrapper>
			<TableNabPanel>
				Количество записей ({handlePageFromOutside?.total || dataLength})
				{enableSearch && (
					<Search
						placeholder="Найти..."
						value={filters.term}
						onChange={(e) =>
							setFilters((v) => ({ ...v, term: e.target.value }))
						}
					/>
				)}
			</TableNabPanel>
			<TableScroll>
				<TableStyled>
					<thead ref={focusRef}>
						<tr>
							{enableActions && <TableHeader name="Действия" />}
							{headers.map((head, index) => (
								<TableHeader
									key={index}
									name={head.name}
									filterType={head.filterType}
								/>
							))}
						</tr>
					</thead>
					<tbody>
						{getMessagesByFilters(filters)?.map((item, keyIndex) => (
							<Tr isOpened={item.isOpened} key={keyIndex}>
								{enableActions && actions && <td>{actions(item)}</td>}
								{item.values.map((value, index) => (
									<td key={index}>
										{value.name === "@HISTORY" && showHistory ? (
											"history"
										) : (
											<a
												href={item.link}
												target="_blank"
												onClick={() => onClick && onClick(item)}
											>
												{value?.type === "Date"
													? convertDate(value.name)
													: value.name}
											</a>
										)}
									</td>
								))}
							</Tr>
						))}
					</tbody>
				</TableStyled>
			</TableScroll>
			<PagesController>
				<div>
					Показать
					<select
						value={filters.cellPerPage}
						onChange={(e) =>
							setFilters((v) => ({ ...v, cellPerPage: Number(e.target.value) }))
						}
						disabled={!!handlePageFromOutside}
					>
						<option>10</option>
						<option>25</option>
						<option>50</option>
					</select>
					Записей
				</div>
				<div>
					<PageButton
						disabled={
							handlePageFromOutside
								? handlePageFromOutside.page === 1
								: filters.page === 1
						}
						onClick={() => {
							handlePageFromOutside
								? handlePageFromOutside.setPage(1)
								: setFilters((v) => ({ ...v, page: 1 }));
						}}
					>
						{"<<"}
					</PageButton>
					<PageButton
						disabled={
							handlePageFromOutside
								? handlePageFromOutside.page === 1
								: filters.page === 1
						}
						onClick={() => {
							handlePageFromOutside
								? handlePageFromOutside.setPage(handlePageFromOutside.page - 1)
								: setFilters((v) => ({ ...v, page: v.page - 1 }));
						}}
					>
						{"<"}
					</PageButton>
					{handlePageFromOutside ? handlePageFromOutside.page : filters.page}
					<PageButton
						disabled={
							handlePageFromOutside
								? handlePageFromOutside.page ===
								  handlePageFromOutside.totalPages
								: dataLength / (filters.cellPerPage * filters.page) < 1
						}
						onClick={() => {
							handlePageFromOutside
								? handlePageFromOutside.setPage(handlePageFromOutside.page + 1)
								: setFilters((v) => ({ ...v, page: v.page + 1 }));
						}}
					>
						{">"}
					</PageButton>
					<PageButton
						disabled={
							handlePageFromOutside
								? handlePageFromOutside.page ===
								  handlePageFromOutside.totalPages
								: dataLength / (filters.cellPerPage * filters.page) < 1
						}
						onClick={() => {
							handlePageFromOutside
								? handlePageFromOutside.setPage(
										handlePageFromOutside?.totalPages
								  )
								: setFilters((v) => ({
										...v,
										page: Math.ceil(dataLength / filters.cellPerPage),
								  }));
						}}
					>
						{">>"}
					</PageButton>
				</div>
			</PagesController>
		</TableWrapper>
	);
}

const TableNabPanel = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
`;

const Search = styled.input`
	width: 20rem;
	display: flex;
	border: none;
	border-bottom: 1px solid #ddd;
	outline: none;
	font-family: inherit;
`;

const PageButton = styled.button`
	padding: 0.3rem;
	width: 2rem;
	height: 2rem;
	border: 1px solid rgba(0, 0, 0, 0.3);
	border-radius: 1rem;
	background: none;
	cursor: pointer;
	:disabled {
		cursor: not-allowed;
		border: 1px solid rgba(0, 0, 0, 0.3);
		color: rgba(0, 0, 0, 0.3);
		:hover {
			border: 1px solid rgba(0, 0, 0, 0.3);
			color: rgba(0, 0, 0, 0.3);
		}
	}
	:hover {
		border: 1px solid ${({ theme }) => theme.colors.main};
		color: ${({ theme }) => theme.colors.main};
	}
`;

interface TrProps {
	isOpened?: boolean;
}

const PagesController = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 1rem;
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.6rem;
	}
`;

const Tr = styled.tr<TrProps>`
	background-color: ${({ isOpened }) =>
		isOpened ? "none !important" : "rgba(255, 103, 0, 0.4) !important"};
`;

const TableWrapper = styled.div``;

const TableScroll = styled.div`
	overflow-x: scroll;
`;

export const TableStyled = styled.table`
	width: 100%;
	border: none;
	margin-bottom: 20px;
	border-collapse: collapse;
	th {
		font-weight: bold;
		text-align: left;
		border: none;
		padding: 0.5rem;
		background: ${({ theme }) => theme.colors.main};
		color: white;
		font-size: 0.8rem;
		border-left: 1px solid ${({ theme }) => theme.colors.main};
		border-right: 1px solid ${({ theme }) => theme.colors.main};
		:first-child {
			border-left: none;
		}
		:last-child {
			border-right: none;
		}
	}
	td {
		text-align: left;
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
		padding: 0.5rem;
		font-size: 0.8rem;
		vertical-align: top;
		:first-child {
			border-left: none;
		}
		:last-child {
			border-right: none;
		}
	}
	tbody tr:nth-child(even) {
		background: #f3f3f3;
	}
	a {
		word-wrap: break-all;
		color: ${({ theme }) => theme.colors.black};
		text-decoration: none;
	}
`;

export default Table;
