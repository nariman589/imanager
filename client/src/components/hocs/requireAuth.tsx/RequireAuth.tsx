import axios from "axios";
import agent from "components/api/agent";
import React, { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	GET_INSTRUCTIONS,
	GET_INSTRUCTIONS_BEGIN,
	GET_PROCESSES_BEGIN,
	GET_PROCESSES_SUCCES,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REMOVE_USER,
} from "./actions";
import reducer from "./reducer";
import { authContextInitialValues, AuthContext } from "./store";

interface RequireAuthI {
	children: any;
}

const user = localStorage.getItem("user");

function RequireAuth({ children }: RequireAuthI) {
	const [state, dispatch] = useReducer(reducer, authContextInitialValues);

	const setUserToStateFromLocalStorage = () => {
		if (user)
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: JSON.parse(user),
			});
	};

	const getUser = async (name: string) => {
		const { value } = await agent.employeeApi.getEmployee(name);
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: value,
		});
		addUserToLocalStorage(value);
		return;
	};

	const removeUser = () => {
		dispatch({
			type: REMOVE_USER,
		});
		removeUserFromLocalStorage();
	};

	const navigate = useNavigate();

	const addUserToLocalStorage = (user: any) => {
		localStorage.setItem("user", JSON.stringify(user));
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	const getProcesses = async () => {
		if (!state.processesList) {
			dispatch({
				type: GET_PROCESSES_BEGIN,
			});
			const { value } = await agent.menuApi.getMenuByTabNumber(
				2,
				Number(state.user.employeeTabNumber)
			);
			dispatch({
				type: GET_PROCESSES_SUCCES,
				payload: value,
			});
		}
	};

	const getInstructions = async (update?: boolean) => {
		if (!state.instructionsList || update) {
			dispatch({
				type: GET_INSTRUCTIONS_BEGIN,
			});
			const { value } = await agent.instuctionsApi.getAll();
			dispatch({
				type: GET_INSTRUCTIONS,
				payload: value,
			});
		}
	};

	useEffect(() => {
		if (!user) {
			const isConnected = async () => {
				dispatch({
					type: REGISTER_USER_BEGIN,
				});
				try {
					const response = await axios.get(
						window.location.origin + "/ws/is-connected"
					);
					if (response.data) {
						const { sso } = response.data;
						await getUser(sso.user.name);
					} else {
						fConnectWithSSO();
					}
				} catch (err) {
					fConnectWithSSO();
				}
			};

			const fConnectWithSSO = async () => {
				try {
					const response = await axios.get(
						window.location.origin + "/ws/connect-with-sso"
					);
					if (response.data) {
						const { sso } = response.data;
						await getUser(sso.user.name);
					} else {
						removeUser();
						navigate("/login");
					}
				} catch (err) {
					removeUser();
					navigate("/login");
				} finally {
				}
			};

			isConnected();
		}
		if (user) {
			getUser(JSON.parse(user)?.employeeLogin);
		}
	}, []);

	useEffect(() => {
		if (!state.user) setUserToStateFromLocalStorage();
		if (state.user) {
			getProcesses();
			getInstructions();
		}
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{ ...state, getUser, removeUser, getInstructions }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default RequireAuth;
