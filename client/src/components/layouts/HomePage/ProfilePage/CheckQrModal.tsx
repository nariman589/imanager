import agent from "components/api/agent";
import { useAuth } from "components/hooks/useAuth";
import { Loader } from "components/ui/Loader/Loader";
import {
	MTitle,
	MBody,
	MInputWrapper,
	MFile,
	MButtons,
	MButton,
} from "components/ui/Modal/components";
import Modal from "components/ui/Modal/Modal";
import { convertBase64 } from "components/utils/helpers";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface qrFileI {
	file: File;
	type: "docx" | "pdf";
}

interface Props {
	qrRef: React.MutableRefObject<any>;
	setOpenQrModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CheckQrModal({ qrRef, setOpenQrModal }: Props) {
	const { user } = useAuth();

	const [qrFile, setQrFile] = useState<qrFileI | null>(null);

	const [qrLoading, setQrLoading] = useState(false);

	const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = Array.from(e.target.files)[0];
			if (file.name.includes(".pdf")) {
				setQrFile({
					file: file,
					type: "pdf",
				});
				return;
			}
			if (file.name.includes(".docx") || file.name.includes(".doc")) {
				setQrFile({
					file: file,
					type: "docx",
				});
				return;
			}
			toast.warn("Только word и pdf файлы");
			return;
		}
	};

	const handleQr = async () => {
		if (qrFile) {
			setQrLoading(true);
			const file = (
				await agent.cabinetApi.fakeQr({
					pdfDocument: await convertBase64(qrFile.file),
					type: qrFile.type,
					signer: {
						dep: user?.employeeDepartmentName,
						fullName: user?.employeeFullName,
						iin: user?.employeeIIN,
						position: user?.employeePositionName,
						tabNumber: user?.employeeTabNumber,
					},
				})
			).value;
			const w = window.open("about:blank");
			if (w)
				setTimeout(function () {
					const html =
						'<html><body style="margin:0!important"><embed width="100%" height="100%" src="data:application/pdf;base64,' +
						file +
						'" type="application/pdf" /></body></html>';

					w.document.write(html);
				}, 0);
		}
		setQrLoading(false);
	};
	return (
		<Modal openRef={qrRef} onClick={() => setOpenQrModal(false)}>
			<MTitle>Проверка QR Кода</MTitle>
			<MBody>
				<MInputWrapper>
					<MFile onChange={handleQrChange} />
				</MInputWrapper>
				<MButtons>
					<MButton type="button" onClick={handleQr} disabled={qrLoading}>
						Загрузить {qrLoading && <Loader />}
					</MButton>
					<MButton
						type="button"
						isCancel
						onClick={() => setOpenQrModal(false)}
						disabled={qrLoading}
					>
						Отмена {qrLoading && <Loader />}
					</MButton>
				</MButtons>
			</MBody>
		</Modal>
	);
}

export default CheckQrModal;
