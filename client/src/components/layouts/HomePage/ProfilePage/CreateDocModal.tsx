import agent from "components/api/agent";
import { useClickOutside } from "components/hooks/clickOutsideHook";
import { useAuth } from "components/hooks/useAuth";
import useDebounce from "components/hooks/useDebounce";
import { Loader } from "components/ui/Loader/Loader";
import {
	MBody,
	MButton,
	MButtons,
	MFile,
	MInput,
	MInputWrapper,
	MOption,
	MOptions,
	MTitle,
} from "components/ui/Modal/components";
import Modal from "components/ui/Modal/Modal";
import { convertBase64 } from "components/utils/helpers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Document, SapEvents } from "types/CabinetTypes";
import { SubstituteListI } from "types/SubstituteTypes";
import { Checkbox } from "../SubstitutionPage/SubstitutionTable";

interface Props {
	openRef: React.MutableRefObject<any>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateDocModal({ openRef, setOpen }: Props) {
	const { user } = useAuth();
	const [docValues, setDocValues] = useState<Document>({
		employeeTabNum: 0,
		employeeFullName: "",
		sapEventId: "",
		employeeIIN: "",
		regNum: "",
		regDate: "",
		executorTabNum: Number(user?.employeeTabNumber),
		files: [],
		isNeedHRChief: true,
		isNeedHRSubChief: true,
		isNeedEmployeeReview: true,
		isCandidate: false,
	});

	const [empLoading, setEmpLoading] = useState(false);
	const [sapLoading, setSapLoading] = useState(false);
	const [creationLoading, setCreationLoading] = useState(false);

	const [files, setFiles] = useState<File[]>([]);

	const {
		open: openOptions,
		setOpen: setOpenOptions,
		openRef: optionsRef,
	} = useClickOutside();

	const {
		open: openSapOptions,
		setOpen: setOpenSapOptions,
		openRef: sapOptionsRef,
	} = useClickOutside();

	const tabNumberDebounce = useDebounce(docValues.employeeTabNum);
	const FioDebounce = useDebounce(docValues.employeeFullName);

	const handleTabChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setDocValues((v) => ({ ...v, employeeTabNum: +e.target.value }));
	};

	const handleFullNameChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setDocValues((v) => ({ ...v, employeeFullName: e.target.value }));
	};

	const handleSapChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSapTerm(e.target.value);
		setDocValues((v) => ({ ...v, sapEventName: e.target.value }));
		setOpenSapOptions(true);
	};

	const handleTabNumDebounce = async () => {
		setEmpLoading(true);
		const data = (
			await agent.substituteApi.getEmployeesByTerm(undefined, tabNumberDebounce)
		).value[0];
		setDocValues((v) => ({
			...v,
			employeeFullName: data?.fio,
			employeeIIN: data?.iin,
		}));
		setEmpLoading(false);
	};

	const handleFioDebounce = async () => {
		setEmpLoading(true);
		setOptions(
			(await agent.substituteApi.getEmployeesByTerm(FioDebounce, undefined))
				.value
		);
		setOpenOptions(true);
		setEmpLoading(false);
	};

	useEffect(() => {
		if (tabNumberDebounce !== 0) handleTabNumDebounce();
	}, [tabNumberDebounce]);

	useEffect(() => {
		if (FioDebounce?.length !== 0) handleFioDebounce();
	}, [FioDebounce]);

	const handleOptionClick = (item: SubstituteListI) => {
		setDocValues((v) => ({
			...v,
			employeeTabNum: item.tabNumber,
			employeeFullName: item.fio,
		}));
		setOpenOptions(false);
	};

	const handleSapClick = async (item: SapEvents) => {
		setDocValues((v) => ({
			...v,
			sapEventName: item?.name,
			sapEventId: item?.id,
		}));
		setOpenSapOptions(false);
	};

	const loadSapOptions = async () => {
		if (sapOptions.length === 0) {
			setSapLoading(true);
			setSapOptions((await agent.cabinetApi.getSapEvents()).value);
			setSapLoading(false);
		}
		setOpenSapOptions(true);
	};

	const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			setFiles((v) => v.concat(Array.from(filesArray)));
		}
	};

	const handleCreation = async () => {
		setCreationLoading(true);
		if (
			(docValues.sapEventId === "39" || docValues.sapEventId === "1") &&
			docValues.isCandidate &&
			files?.length < 3
		) {
			toast.warn("Вложите минимум 3 файла");
			setCreationLoading(false);
			return;
		}
		const emptyFileds = Object.values(docValues).filter(
			(item) => item === "" || item === 0
		);
		if (emptyFileds.length !== 0) {
			toast.warn("Не все поля заполнены");
			setCreationLoading(false);
			return;
		}
		const isCandidate =
			docValues.sapEventId === "39" &&
			docValues.isCandidate &&
			!docValues.isNeedHRChief;
		const isCandidateSelection =
			docValues.sapEventId === "1" && docValues.isCandidate;

		const promises = Array.from(files).map(async (file) => {
			const formData = new FormData();
			formData.append("file", file);
			return {
				sign: !(file.name.includes(".xls") || file.name.includes(".xlsx")),
				name: file.name,
				link: (await agent.fileApi.postFile(formData)).Data.FilePathUrl,
				fileData: await convertBase64(file),
			};
		});
		Promise.all(promises).then(async (responseFiles) => {
			Promise.all(
				responseFiles.map(async (file, index) => {
					if (isCandidate) {
						if (index === 1) {
							agent.cabinetApi.postToPortal({
								file: file.fileData,
								fileName: file.name,
								candidateIin: docValues.employeeIIN,
								keyName: "_96",
							});
						}
						if (index === 2) {
							agent.cabinetApi.postToPortal({
								file: file.fileData,
								fileName: file.name,
								candidateIin: docValues.employeeIIN,
								keyName: "_97",
							});
						}
						if (index === 3) {
							agent.cabinetApi.postToPortal({
								file: file.fileData,
								fileName: file.name,
								candidateIin: docValues.employeeIIN,
								keyName: "_98",
							});
						}
						if (index === 4) {
							agent.cabinetApi.postToPortal({
								file: file.fileData,
								fileName: file.name,
								candidateIin: docValues.employeeIIN,
								keyName: "_101",
							});
						}
					}
				})
			);

			await agent.cabinetApi.createDocument({
				...docValues,
				files: responseFiles.map((file, index) => {
					if (isCandidateSelection) {
						if (index === 0) {
							return {
								...file,
								name: `_99${file.name}`,
							};
						}
						if (index === 1) {
							return {
								...file,
								name: `_100${file.name}`,
							};
						}
						if (index === 2) {
							return {
								...file,
								name: `_103${file.name}`,
							};
						}
						if (index === 3) {
							return {
								...file,
								name: `_102${file.name}`,
							};
						}
					}
					return file;
				}),
			});
			setCreationLoading(false);
			setOpen(false);
		});
	};

	const reqFiles = [
		{
			"1": "Соглашение о неразглашении конфиденциальной информации",
			"39": "Обязательство о неразглашении конфиденциальной информации",
		},
		{
			"1": "Трудовой договор",
			"39": "ОБЯЗАТЕЛЬСТВО о соблюдении требований ИБ",
		},
		{
			"1": "Приказ о приеме на работу",
			"39": "Согласие работника на сбор и обработку персональных данных",
		},
		{
			"1": "Договор о полной индивидуальной материальной ответственности",
			"39": "Обязательство о неразглашении конфиденциальной информации для кассиров",
		},
	];

	const handleFileDelete = (index: number) => {
		setFiles((v) => v.filter((_, i) => index !== i));
	};

	const [options, setOptions] = useState<SubstituteListI[]>([]);
	const [sapOptions, setSapOptions] = useState<SapEvents[]>([]);
	const [sapTerm, setSapTerm] = useState<string>("");
	return (
		<Modal openRef={openRef} onClick={() => setOpen(false)}>
			<MTitle>Добавление приказа/документа</MTitle>
			<MBody>
				<MInputWrapper>
					<label>Табельный номер: {empLoading && <Loader />}</label>
					<MInput
						type="number"
						value={docValues.employeeTabNum}
						onChange={handleTabChange}
					/>
				</MInputWrapper>
				<MInputWrapper>
					<label>ФИО: {empLoading && <Loader />}</label>
					<MInput
						value={docValues.employeeFullName}
						onChange={handleFullNameChange}
					/>
					{openOptions && (
						<MOptions ref={optionsRef}>
							{options.map((item) => (
								<MOption
									key={item.logonname}
									onClick={() => handleOptionClick(item)}
								>
									{item.fio}
								</MOption>
							))}
						</MOptions>
					)}
				</MInputWrapper>
				<MInputWrapper>
					<label>Номер приказа:</label>
					<MInput
						value={docValues.regNum}
						onChange={(e) =>
							setDocValues((v) => ({ ...v, regNum: e.target.value }))
						}
					/>
				</MInputWrapper>
				<MInputWrapper>
					<label>Мероприятие: {sapLoading && <Loader />}</label>
					<MInput
						value={docValues.sapEventName}
						onChange={handleSapChange}
						onClick={loadSapOptions}
					/>
					{openSapOptions && (
						<MOptions ref={sapOptionsRef}>
							{sapOptions
								?.filter((item) =>
									item?.name
										?.toLocaleLowerCase()
										?.includes(sapTerm.toLocaleLowerCase())
								)
								?.map((item) => (
									<MOption key={item.id} onClick={() => handleSapClick(item)}>
										{item.name}
									</MOption>
								))}
						</MOptions>
					)}
				</MInputWrapper>
				<MInputWrapper>
					<label>Дата регистрации приказа:</label>
					<MInput
						type="date"
						value={docValues.regDate}
						onChange={(e) =>
							setDocValues((v) => ({ ...v, regDate: e.target.value }))
						}
					/>
				</MInputWrapper>
				<MInputWrapper>
					<label>Не требует подтверждения начальника УКА</label>
					<Checkbox
						type="checkbox"
						checked={!docValues.isNeedHRChief}
						onChange={(e) =>
							setDocValues((v) => ({
								...v,
								isNeedHRChief: !e.target.checked,
							}))
						}
					/>
				</MInputWrapper>
				<MInputWrapper>
					<label>Не требует подтверждения и подписи руководителя ДРЧК:</label>
					<Checkbox
						type="checkbox"
						checked={!docValues.isNeedHRSubChief}
						onChange={(e) =>
							setDocValues((v) => ({
								...v,
								isNeedHRSubChief: !e.target.checked,
							}))
						}
					/>
				</MInputWrapper>
				<MInputWrapper>
					<label>Не требует ознакомления сотрудника:</label>
					<Checkbox
						type="checkbox"
						checked={!docValues.isNeedEmployeeReview}
						onChange={(e) =>
							setDocValues((v) => ({
								...v,
								isNeedEmployeeReview: !e.target.checked,
							}))
						}
					/>
				</MInputWrapper>
				<MInputWrapper>
					<label>Кандидат(приём)</label>
					<Checkbox
						type="checkbox"
						checked={docValues.isCandidate}
						onChange={(e) =>
							setDocValues((v) => ({ ...v, isCandidate: e.target.checked }))
						}
					/>
				</MInputWrapper>
				{(docValues.sapEventId === "1" || docValues.sapEventId === "39") &&
					docValues.isCandidate && (
						<RequiredFiles>
							<RFilesHeader>
								<div>Порядок файлов</div>
								<div>
									{docValues.sapEventId === "1"
										? "Приём"
										: "Обязательства и Согласие"}
								</div>
							</RFilesHeader>
							{reqFiles.map((item, index) => (
								<RFile>
									<div>{index + 1}</div>
									<div>
										{docValues.sapEventId === "1" ? item["1"] : item["39"]}
									</div>
								</RFile>
							))}
						</RequiredFiles>
					)}

				<MInputWrapper>
					<label>Файлы</label>
					<MFile
						multiple
						onChange={handleFilesChange}
						accept=".doc,.docx,.pdf,.xlsx,.xls"
					/>
				</MInputWrapper>
				{files.length !== 0 && (
					<RequiredFiles>
						<FilesHeader>
							<div>Тип файла</div>
							<div>Вложения</div>
							<div>Действие</div>
						</FilesHeader>
						{files.map((file, index) => (
							<FilesItem>
								<div>
									{index <= 3 &&
										docValues.isCandidate &&
										((docValues.sapEventId === "1" ||
											docValues.sapEventId === "39") &&
										docValues.sapEventId === "1"
											? reqFiles[index]["1"]
											: reqFiles[index]["39"])}
								</div>
								<div>{file.name}</div>
								<Delete onClick={() => handleFileDelete(index)}>Удалить</Delete>
							</FilesItem>
						))}
					</RequiredFiles>
				)}
				<MButtons>
					<MButton
						disabled={creationLoading}
						type="button"
						onClick={handleCreation}
					>
						Создать {creationLoading && <Loader />}
					</MButton>
					<MButton
						disabled={creationLoading}
						type="button"
						isCancel
						onClick={() => setOpen(false)}
					>
						Отмена {creationLoading && <Loader />}
					</MButton>
				</MButtons>
			</MBody>
		</Modal>
	);
}

const RequiredFiles = styled.div`
	display: flex;
	flex-direction: column;
`;

const RFilesHeader = styled.div`
	padding: 0.5rem;
	display: grid;
	grid-template-columns: 20% 60%;
	gap: 10%;
	font-size: 0.8rem;
	font-weight: 600;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

const RFile = styled.div`
	padding: 0.5rem;
	display: grid;
	grid-template-columns: 20% 60%;
	gap: 10%;
	font-size: 0.8rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

const FilesHeader = styled.div`
	padding: 0.5rem;
	display: grid;
	grid-template-columns: 8rem 7rem 6rem;
	gap: 2rem;
	font-size: 0.8rem;
	font-weight: 600;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

const FilesItem = styled.div`
	padding: 0.5rem;
	display: grid;
	grid-template-columns: 8rem 7rem 6rem;
	gap: 2rem;
	font-size: 0.8rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;
const Delete = styled.div`
	color: ${({ theme }) => theme.colors.main};
	cursor: pointer;
`;

export default CreateDocModal;
