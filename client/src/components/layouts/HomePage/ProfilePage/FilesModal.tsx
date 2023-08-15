import agent from "components/api/agent";
import { Loader } from "components/ui/Loader/Loader";
import { MTitle } from "components/ui/Modal/components";
import Modal from "components/ui/Modal/Modal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { file } from "types/CabinetTypes";

interface Props {
	id?: string;
	setShowFiles: React.Dispatch<React.SetStateAction<boolean>>;
	filesRef: React.MutableRefObject<any>;
}

function FilesModal({ id, setShowFiles, filesRef }: Props) {
	const [filesList, setFilesList] = useState<file[]>([]);
	const [filesLoading, setFilesLoading] = useState(false);

	const getFiles = async () => {
		setFilesLoading(true);
		setFilesList((await agent.cabinetApi.getDocumentFiles(id)).value);
		setFilesLoading(false);
	};

	useEffect(() => {
		getFiles();
	}, []);
	return (
		<Modal openRef={filesRef} onClick={() => setShowFiles(false)}>
			<MTitle>Файлы документа{filesLoading && <Loader />}</MTitle>
			<FTable>
				<thead>
					<tr>
						<th>Наименование</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{filesList.map((file, index) => (
						<tr key={index}>
							<td>{file.name}</td>
							<td>
								<a download href={file.link}>
									Скачать
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</FTable>
		</Modal>
	);
}

const FTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 1.5rem;
`;

export default FilesModal;
