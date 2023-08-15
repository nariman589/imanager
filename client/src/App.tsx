import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "components/layouts/Footer/Footer";
import NavBar from "components/layouts/NavBar/Header/NavBar";
import Panel from "components/layouts/HomePage/Panel/Panel";
import RequireAuth from "components/hocs/requireAuth.tsx/RequireAuth";
import Login from "components/pages/LoginPage/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = {
	colors: {
		main: "#ff6700",
		black: "#1D1D1B",
		grey: "#f1f2f5",
	},
	boxShadow: "0px 8px 24px rgba(129, 135, 189, 0.15)",
	borderRadius: "15px",
};

function App() {
	const location = useLocation();
	return (
		<RequireAuth>
			<ThemeProvider theme={theme}>
				{location.pathname === "/login" ? (
					<Login />
				) : (
					<>
						<SecurityMessage>
							Вы несете ответственность за несанкционированный доступ и
							использование конфиденциальной информации в личных целях!
						</SecurityMessage>
						<NavBar />
						<Wrapper>
							<Panel />
							<Outlet />
						</Wrapper>
						<Footer />
					</>
				)}
				<ToastContainer
					position="bottom-right"
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</ThemeProvider>
		</RequireAuth>
	);
}
const SecurityMessage = styled.div`
	display: flex;
	background-color: #1d1d1b;
	color: #ffffff;
	font-size: 12px;
	font-weight: 400;
	padding-top: 5px;
	padding-bottom: 5px;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	width: 90vw;
	margin: 0 auto;
	margin-top: 1.625rem;
	display: flex;
	flex-direction: column;
	gap: 2.25rem;
`;

export default App;
