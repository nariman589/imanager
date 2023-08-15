import React from "react";
import logo from "assets/logo.svg";
import IconsList from "../IconsList/IconsList";
import Profile from "../Profile/Profile";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import { Link } from "react-router-dom";
import {
	Header,
	HeaderElementsWrapper,
	HeaderElement,
	Logo,
} from "./components";

function NavBar() {
	return (
		<Header>
			<HeaderElementsWrapper>
				<HeaderElement>
					<Link to={"/"}>
						<Logo src={logo}></Logo>
					</Link>
				</HeaderElement>
				<HeaderElement>
					<HeaderSearch />
				</HeaderElement>
				<HeaderElement>
					<IconsList />
				</HeaderElement>
				<HeaderElement>
					<Profile />
				</HeaderElement>
			</HeaderElementsWrapper>
		</Header>
	);
}

export default NavBar;
