import agent from "components/api/agent";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import { useAuth } from "components/hooks/useAuth";
import useDebounce from "components/hooks/useDebounce";
import { ElementsContainer } from "components/pages/MainPage/components";
import { Loader } from "components/ui/Loader/Loader";
import Modal from "components/ui/Modal/Modal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SubstituteAllListI, SubstituteListI } from "types/SubstituteTypes";
import { ReactComponent as Update } from "assets/update.svg";
import { ReactComponent as Add } from "assets/addSub.svg";
import { ReactComponent as Remove } from "assets/deleteSub.svg";
import {
	MTitle,
	MBody,
	MInputWrapper,
	MInput,
	MOptions,
	MOption,
	MButtons,
	MButton,
} from "components/ui/Modal/components";

interface Props {
	update: any;
	choosenList: SubstituteAllListI[];
}

function SubstitutionActions({ update, choosenList }: Props) {
	const { open, setOpen, openRef } = useClickOutside();
	const {
		open: openOptions,
		setOpen: setOpenOptions,
		openRef: optionsRef,
	} = useClickOutside();
	const [choosen, setChoosen] = useState<SubstituteListI>({
		department: "",
		email: "",
		fio: "",
		logonname: "",
		phonelocal: "",
		position: "",
		tabNumber: 0,
	});
	const [endDate, setEndDate] = useState("");
	const [searchLoading, setSearchLoading] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
	const [subList, setSublist] = useState<SubstituteListI[]>([]);

	const debValue = useDebounce(choosen.fio);

	const handleSubstitutionsSearch = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setChoosen((v) => ({ ...v, fio: e.target.value }));
	};

	const handleDebounce = async () => {
		setSearchLoading(true);
		setSublist((await agent.substituteApi.getEmployeesByTerm(debValue)).value);
		setSearchLoading(false);
	};

	useEffect(() => {
		if (debValue.length !== 0) handleDebounce();
	}, [debValue]);

	const handleAdd = (sub: SubstituteListI) => {
		setChoosen(sub);
		setOpenOptions(false);
	};

	const { user } = useAuth();

	const handleAddSubs = async () => {
		setAddLoading(true);
		await agent.substituteApi.add({
			assistant_code: choosen.logonname,
			assistant_name: choosen.fio,
			enD_DATETIME: endDate,
			userCode: user?.employeeLogin,
		});
		setAddLoading(false);
		setOpen(false);
		update();
	};

	const handleDeletion = async () => {
		await Promise.all(
			choosenList?.map((item) =>
				agent.substituteApi.remove({
					assistant_code: item.userCode,
					userCode: user?.employeeLogin,
				})
			)
		);
		update();
	};

	const isChecked = () => {
		return !!choosenList?.length;
	};

	return (
		<ElementsContainer>
			{open && (
				<Modal openRef={openRef} onClick={() => setOpen(false)}>
					<MTitle>Добавление нового заместителя</MTitle>
					<MBody>
						<MInputWrapper ref={optionsRef}>
							<label>ФИО:{searchLoading && <Loader />}</label>
							<MInput
								onChange={handleSubstitutionsSearch}
								value={choosen.fio}
								onClick={() => setOpenOptions(true)}
							/>
							{openOptions && (
								<MOptions>
									{subList?.map((sub) => (
										<MOption onClick={() => handleAdd(sub)}>{sub.fio}</MOption>
									))}
								</MOptions>
							)}
						</MInputWrapper>
						<MInputWrapper>
							<label>Код пользователя:</label>
							<MInput disabled={true} value={choosen.tabNumber || ""} />
						</MInputWrapper>
						<MInputWrapper>
							<label>Срок окончания действия заместителя:</label>
							<MInput
								type="date"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
							/>
						</MInputWrapper>
						<MInputWrapper>
							<label>E-mail:</label>
							<MInput disabled={true} value={choosen.email} />
						</MInputWrapper>
						<MButtons>
							<MButton onClick={() => handleAddSubs()} disabled={addLoading}>
								Добавить {addLoading && <Loader />}
							</MButton>
							<MButton
								isCancel
								disabled={addLoading}
								onClick={() => setOpen(false)}
							>
								Отмена {addLoading && <Loader />}
							</MButton>
						</MButtons>
					</MBody>
				</Modal>
			)}
			<Wrapper>
				<Button onClick={() => update()}>
					Обновить <Update />
				</Button>
				<Button onClick={() => setOpen(true)}>
					Добавить <Add />
				</Button>
				<Button disabled={!isChecked()} onClick={() => handleDeletion()}>
					Удалить <Remove />
				</Button>
			</Wrapper>
		</ElementsContainer>
	);
}

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

interface isActive {
	isActive?: boolean;
}

export const Button = styled.button<isActive>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	border-radius: ${({ theme }) => theme.borderRadius};
	border: none;
	font-size: 1.2rem;
	height: 3rem;
	font-size: 0.8rem;
	cursor: pointer;
	color: ${({ isActive }) => isActive && "white"};
	background-color: ${({ isActive, theme }) => isActive && theme.colors.main};
	svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: ${({ isActive }) => isActive && "white"};
		stroke: ${({ isActive }) => isActive && "white"};
	}
	:hover {
		color: white;
		background-color: ${({ theme }) => theme.colors.main};
		svg {
			fill: white;
			stroke: white;
		}
	}
`;

export default SubstitutionActions;
