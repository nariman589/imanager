import { ElementsContainer } from "components/pages/MainPage/components";
import React from "react";
import styled from "styled-components";

function Applications() {
	const appList = [
		{
			name: "Комплаенс",
			children: [
				{
					name: "Анонимное сообщение Главному комплаенс-контролёру",
					link: "https://i-manager.tsb.kz/complianceanonymousmessage",
				},
				{
					name: "Проверка ЛСБОО",
					link: "https://i-manager.tsb.kz/complianceaffil",
				},
			],
		},
		{
			name: "Юридический департамент",
			children: [
				{
					name: "База юридических доверенностей",
					link: "https://i-manager.tsb.kz/RegistrationOfPowerOfAttorney/PowerOfAttorneyGrid",
				},
			],
		},
		{
			name: "Платежные карточки",
			children: [
				{
					name: "Заказ неименного пластика",
					link: "https://i-manager-test.tsb.kz/Admin_CardsPlasticOrdering",
				},
			],
		},
	];
	return (
		<ElementsContainer>
			{appList.map((parent) => (
				<Parent key={parent.name}>
					<Title>{parent.name}</Title>
					<Childrens>
						{parent.children.map((child) => (
							<Child key={child.name} href={child.link} target="_blank">
								{child.name}
							</Child>
						))}
					</Childrens>
				</Parent>
			))}
		</ElementsContainer>
	);
}

export default Applications;

const Parent = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2``;

const Childrens = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
`;

const Child = styled.a`
	text-decoration: none;
	color: ${({ theme }) => theme.colors.main};
`;
