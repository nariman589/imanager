import agent from "components/api/agent";
import { ElementsContainer } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import { convertDate } from "components/utils/helpers";
import React from "react";
import styled from "styled-components";
import { SubstituteAllListI } from "types/SubstituteTypes";

interface Props {
	list: SubstituteAllListI[] | null;
	choosenList: SubstituteAllListI[];
	setChoosen: React.Dispatch<React.SetStateAction<SubstituteAllListI[]>>;
	isLoading: boolean;
}

function SubstitutionTable({
	list,
	choosenList,
	setChoosen,
	isLoading,
}: Props) {
	const isChecked = (item: SubstituteAllListI) => {
		const found = choosenList?.find((x) => x.userCode === item.userCode);
		if (found) return true;
		return false;
	};

	const handleChoose = (item: SubstituteAllListI) => {
		if (isChecked(item))
			setChoosen((v) => v.filter((x) => x.userCode !== item.userCode));
		else setChoosen((v) => [...v, item]);
	};
	if (isLoading)
		return (
			<ElementsContainer>
				<Loader />
			</ElementsContainer>
		);

	return (
		<ElementsContainer>
			<Table>
				<thead>
					<tr>
						<th></th>
						<th>Код заместителя</th>
						<th>ФИО</th>
						<th>Дата окончания</th>
					</tr>
				</thead>
				<tbody>
					{list?.map((item) => (
						<tr>
							<td>
								<Checkbox
									type="checkbox"
									checked={isChecked(item)}
									onChange={() => handleChoose(item)}
								/>
							</td>
							<td>{item.userCode}</td>
							<td>{item.userName}</td>
							<td>{convertDate(item.endDate)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</ElementsContainer>
	);
}

export const Checkbox = styled.input`
	cursor: pointer;
	font-family: inherit;
`;

const Table = styled.table`
	border-collapse: collapse;
	th {
		color: white;
		padding-top: 1rem;
		padding-bottom: 1rem;
		background-color: ${({ theme }) => theme.colors.main};
		:first-child {
			border-top-left-radius: ${({ theme }) => theme.borderRadius};
		}
		:last-child {
			border-top-right-radius: ${({ theme }) => theme.borderRadius};
		}
	}
	td {
		padding-top: 1rem;
		padding-bottom: 1rem;
		text-align: center;
	}
	tr {
		:nth-of-type(even) {
			background-color: #f3f3f3;
			:last-child {
				td {
					:first-child {
						border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
					}
					:last-child {
						border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
					}
				}
			}
		}
	}
`;

export default SubstitutionTable;
