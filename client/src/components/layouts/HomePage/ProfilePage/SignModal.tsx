import { RolesI } from "components/pages/ProfilePage/ProfilePage";
import {
	MBody,
	MButton,
	MButtons,
	MFile,
	MInput,
	MInputWrapper,
	MTitle,
} from "components/ui/Modal/components";
import Modal from "components/ui/Modal/Modal";
import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Eye } from "assets/view.svg";
import { ReactComponent as ClosedEye } from "assets/closeView.svg";

import { CertInfo, Document, signature } from "types/CabinetTypes";
import agent from "components/api/agent";
import { convertBase64 } from "components/utils/helpers";
import { useAuth } from "components/hooks/useAuth";
import { Loader } from "components/ui/Loader/Loader";

interface Props {
	setOpenSign: React.Dispatch<React.SetStateAction<boolean>>;
	signRef: React.MutableRefObject<any>;
	doc: Document;
	role: RolesI;
	updateData: any;
}

function SignModal({ setOpenSign, signRef, doc, role, updateData }: Props) {
	const [showPassword, setshowPassword] = useState(false);
	const [signLoading, setLoading] = useState(false);
	const [cert, setCert] = useState<signature>({
		file: "",
		password: "",
	});

	const { user } = useAuth();

	const [certInfo, setCertInfo] = useState<CertInfo | null>(null);

	const getCertInfo = async () => {
		setCertInfo((await agent.cabinetApi.getCertInfo(cert)).value);
	};

	const handleCert = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const fileBase64 = await convertBase64(e.target.files[0]);
			setCert((v) => ({ ...v, file: fileBase64 }));
		}
	};

	const handleEmployeeSign = async () => {
		setLoading(true);
		const files = (await agent.cabinetApi.getDocumentFiles(doc.id)).value;
		try {
			if (role === "personal") {
				await agent.cabinetApi.employeeSign({
					document: {
						...doc,
						employeeBranchName: user?.employeeBlockName,
						employeeIIN: user?.employeeIIN,
						files: files,
					},
					signature: cert,
					signer: {
						dep: user?.employeeDepartmentName,
						fullName: user?.employeeFullName,
						iin: user?.employeeIIN,
						position: user?.employeePositionName,
						tabNumber: user?.employeeTabNumber,
					},
				});
			} else {
				await agent.cabinetApi.hrSign({
					documents: [
						{
							...doc,
							employeeBranchName: user?.employeeBlockName,
							employeeIIN: user?.employeeIIN,
							files: files,
						},
					],
					signature: cert,
					signer: {
						dep: user?.employeeDepartmentName,
						fullName: user?.employeeFullName,
						iin: user?.employeeIIN,
						position: user?.employeePositionName,
						tabNumber: user?.employeeTabNumber,
					},
				});
			}
		} catch {
			setLoading(false);
		}
		updateData();
		setOpenSign(false);
		setLoading(false);
	};

	return (
		<Modal onClick={() => setOpenSign(false)} openRef={signRef}>
			<MTitle>Подпись с ЭЦП</MTitle>
			<MBody>
				<MInputWrapper>
					<label>ЭЦП</label>
					<MFile accept=".p12" onChange={handleCert} />
				</MInputWrapper>
				<MInputWrapper>
					<label>Пароль</label>
					<Password>
						<MInput
							type={showPassword ? "text" : "password"}
							onChange={(e) =>
								setCert((v) => ({ ...v, password: e.target.value }))
							}
						/>
						{showPassword ? (
							<ClosedEye onClick={() => setshowPassword((v) => !v)} />
						) : (
							<Eye onClick={() => setshowPassword((v) => !v)} />
						)}
					</Password>
				</MInputWrapper>
				<MButtons>
					<MButton
						type="button"
						onClick={handleEmployeeSign}
						disabled={signLoading}
					>
						Подписать {signLoading && <Loader />}
					</MButton>
					<MButton type="button" onClick={getCertInfo} disabled={signLoading}>
						Информация о сертификате {signLoading && <Loader />}
					</MButton>
				</MButtons>
				{certInfo && (
					<Cert>
						<CertFieldWrapper>
							<FieldName>Имя владельца</FieldName>
							<FieldValue>{certInfo.subject.commonName}</FieldValue>
						</CertFieldWrapper>
						<CertFieldWrapper>
							<FieldName>Действителен с</FieldName>
							<FieldValue>{certInfo.subject.notBefore}</FieldValue>
						</CertFieldWrapper>
						<CertFieldWrapper>
							<FieldName>Действителен по</FieldName>
							<FieldValue>{certInfo.subject.notAfter}</FieldValue>
						</CertFieldWrapper>
						<CertFieldWrapper>
							<FieldName>Серийный номер</FieldName>
							<FieldValue>{certInfo.subject.serialNumber}</FieldValue>
						</CertFieldWrapper>
						<CertFieldWrapper>
							<FieldName>Имя издателя</FieldName>
							<FieldValue>{certInfo.issuer.commonName}</FieldValue>
						</CertFieldWrapper>
					</Cert>
				)}
			</MBody>
		</Modal>
	);
}

const Cert = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const CertFieldWrapper = styled.div`
	display: grid;
	grid-template-columns: 30% 65%;
	gap: 5%;
	justify-content: space-between;
`;

const FieldName = styled.div``;

const FieldValue = styled.div``;

const Password = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	svg {
		position: absolute;
		right: 0.6rem;
		width: 1.5rem;
		height: 1.5rem;
	}
	input {
		width: 100%;
	}
`;

export default SignModal;
