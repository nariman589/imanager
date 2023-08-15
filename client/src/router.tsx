import App from "App";
import MainPage from "components/pages/MainPage/MainPage";
import ProcessesPage from "components/pages/ProcessesPage/ProcessesPage";
import { RouteObject } from "react-router";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "components/pages/LoginPage/Login";
import NotFound from "components/pages/ErrorPages/NotFoundPage";
import MessagePage from "components/pages/MessagesPage/MessagePage";
import {
	APPLICATIONS,
	INSTRUCTIONS,
	MY_APPLICTONS,
	PROCESSES,
	PROFILE,
	SUBSTITUTE,
} from "components/variables/urlVariables";
import SubstitutionPage from "components/pages/SubstitutionPage/SubstitutionPage";
import InstructionsPage from "components/pages/InstuctionsPage/InstructionsPage";
import ApplicationsPage from "components/pages/ApplicationsPage/ApplicationsPage";
import ProfilePage from "components/pages/ProfilePage/ProfilePage";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <MainPage />,
			},
			{
				path: PROCESSES + "/*",
				element: <ProcessesPage />,
			},
			{
				path: MY_APPLICTONS + "/*",
				element: <MessagePage />,
			},
			{
				path: SUBSTITUTE,
				element: <SubstitutionPage />,
			},
			{
				path: INSTRUCTIONS,
				element: <InstructionsPage />,
			},
			{
				path: APPLICATIONS,
				element: <ApplicationsPage />,
			},
			{
				path: PROFILE,
				element: <ProfilePage />,
			},
			{ path: "/login", element: <Login /> },
			{
				path: "not-found",
				element: <NotFound />,
			},
			{
				path: "server-error",
				element: <div>ServerError</div>,
			},
			{
				path: "*",
				element: <Navigate replace to={"not-found"} />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
