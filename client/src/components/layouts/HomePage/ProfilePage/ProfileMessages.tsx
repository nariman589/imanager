import agent from "components/api/agent";
import { useAuth } from "components/hooks/useAuth";
import { ElementsContainer } from "components/pages/MainPage/components";
import { RolesI } from "components/pages/ProfilePage/ProfilePage";
import { Loader } from "components/ui/Loader/Loader";
import Table from "components/ui/Table/Table";
import { TBodyProps } from "components/ui/Table/TableTypes";
import React, { useEffect, useState } from "react";
import { Documents, HrAll, HrAllReq } from "types/CabinetTypes";
import HrSearchParams from "./HrSearchParams";
import {
	hrBody,
	hrHeaders,
	personalBody,
	personalHeaders,
} from "./ProfileTableData";
import TableActions from "./TableActions";

interface Props {
	activeCabinet: RolesI;
}

function ProfileMessages({ activeCabinet }: Props) {
	const isPersonal = activeCabinet === "personal";
	const isHr = activeCabinet === "hr";
	const isHrHead = activeCabinet === "hrHead";
	const isHrChief = activeCabinet === "hrChief";
	const isAccounting = activeCabinet === "accounting";

	const { user } = useAuth();

	const getActivRole = () => {
		if (isHrChief) return "HrChief";
		if (isHrHead) return "HrHead";
		if (isHr) return "Hr";
		return "none";
	};

	const initialParams = {
		employeeTabNumber: Number(user?.employeeTabNumber || 0),
		empTab: 0,
		page: 1,
		role: getActivRole(),
		status: 0,
		fromDate: undefined,
		toDate: undefined,
		total: undefined,
		totalPages: undefined,
	};

	const [params, setParams] = useState<HrAllReq>(initialParams);

	const [isLoading, setIsLoading] = useState(false);

	const [tableData, setTableData] = useState<TBodyProps[]>([]);

	const generateBodyForTable = (
		list: any,
		cabinet: "personal" | "hr" | "accounting"
	): TBodyProps[] => {
		if (cabinet === "personal") {
			if (!list?.documents) return [];
			return list.documents?.map((item: any) => ({
				isOpened: true,
				item: item,
				values: personalBody.map((value) => ({
					...value,
					name: item[value.name],
				})),
			}));
		}

		if (cabinet === "hr") {
			if (!list?.content) return [];
			return list.content?.map((item: any) => ({
				isOpened: true,
				item: item,
				values: hrBody.map((value) => ({
					...value,
					name: item[value.name],
				})),
			}));
		} else if (cabinet === "accounting") {
			if (!list?.content) return [];
			return list.content?.map((item: any) => ({
				isOpened: true,
				item: item,
				values: hrBody.map((value) => ({
					...value,
					name: item[value.name],
				})),
			}));
		}
		return [];
	};

	const getTableData = async () => {
		setIsLoading(true);
		if (isPersonal) {
			const data = (
				await agent.cabinetApi.getEmployeeAll(user?.employeeTabNumber)
			).value;
			setTableData(generateBodyForTable(data, "personal"));
		} else if (isHr || isHrHead || isHrChief) {
			const data = (
				await agent.cabinetApi.getHrAll({ ...params, role: getActivRole() })
			).value;
			setTableData(generateBodyForTable(data, "hr"));
			setParams((v) => ({
				...v,
				totalPages: data.totalPages,
				total: data.itemCount,
			}));
		} else if (isAccounting) {
			const data = (await agent.cabinetApi.getAccountingAll(params)).value;
			setTableData(generateBodyForTable(data, "accounting"));
			setParams((v) => ({
				...v,
				totalPages: data.totalPages,
				total: data.itemCount,
			}));
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getTableData();
	}, [params.page]);

	useEffect(() => {
		setParams({ ...initialParams, role: getActivRole() });
		getTableData();
	}, [activeCabinet]);

	const getHeaders = () => {
		if (isPersonal) return personalHeaders;
		return hrHeaders;
	};

	return (
		<ElementsContainer>
			{activeCabinet !== "personal" && (
				<HrSearchParams
					handleSubmit={getTableData}
					params={params}
					setParams={setParams}
					isLoading={isLoading}
					isHr={isHr || isHrChief || isHrHead}
					role={activeCabinet}
				/>
			)}
			{isLoading && <Loader />}
			<Table
				enableSearch
				data={tableData}
				headers={getHeaders()}
				handlePageFromOutside={
					activeCabinet !== "personal"
						? {
								page: params.page,
								setPage: (page: number) => setParams((v) => ({ ...v, page })),
								totalPages: params.totalPages,
								total: params.total,
						  }
						: undefined
				}
				enableActions
				actions={(item) => (
					<TableActions
						item={item}
						role={activeCabinet}
						updateData={getTableData}
					/>
				)}
			/>
		</ElementsContainer>
	);
}

export default ProfileMessages;
