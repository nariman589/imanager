import React from "react";
import { Logo } from "../NavBar/Header/components";
import footerLogo from "assets/logo2.svg";
import {
	Element,
	Elements,
	FooterLinks,
	FooterListElement,
	FooterTitle,
	FooterWrapper,
} from "./components";
import { Link } from "react-router-dom";
import { useAuth } from "components/hooks/useAuth";
import { Loader } from "components/ui/Loader/Loader";

function Footer() {
	const { instructionsList, instructionsLoading } = useAuth();

	const links = [
		{
			url: "https://i-sed.jusan.kz/",
			name: "Новая ЭДО",
		},
		{
			url: "https://servicedesk.tsb.kz/",
			name: "Service Desk",
		},
		{
			url: "https://apps.tsb.kz/Organigramm/Organigramm.aspx",
			name: "Органиграмма",
		},
		{
			url: "https://portal.jusan.kz/bank/",
			name: "Банк идей",
		},
		{
			url: "https://portal.jusan.kz/",
			name: "Портал",
		},
		{
			url: "https://umbrella.tsb.kz/",
			name: "Umbrella",
		},
		{
			url: "https://confluence.operdesk.tsb.kz/#all-updates/",
			name: "База знаний",
		},
		{
			url: "http://tori.tsb.kz/",
			name: "Тори",
		},
		{
			url: "https://wt.tsb.kz:81/view_doc.html?mode=home",
			name: "Учебный портал",
		},
	];

	return (
		<FooterWrapper>
			<Elements>
				<Element>
					<Link to="/">
						<Logo src={footerLogo}></Logo>
					</Link>
				</Element>
				<Element>
					<FooterTitle>Внешние ресурсы</FooterTitle>
					<FooterLinks>
						{links.map((item, index) => (
							<FooterListElement key={item.url + index} to={item.url}>
								{item.name}
							</FooterListElement>
						))}
					</FooterLinks>
				</Element>
				<Element>
					<FooterTitle>Инструкции</FooterTitle>
					{instructionsLoading && <Loader />}
					<FooterLinks>
						{instructionsList?.slice(0, 4).map((item, index) => (
							<FooterListElement
								key={index}
								to={item?.instructionUrl || ""}
								target="_blank"
							>
								{item.instructionName}
							</FooterListElement>
						))}
					</FooterLinks>
				</Element>
			</Elements>
		</FooterWrapper>
	);
}

export default Footer;
