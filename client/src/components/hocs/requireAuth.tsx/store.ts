import { createContext } from "react";
import { EmployeeI } from "types/EmployeeTypes";
import { InstructionList } from "types/InstructionTypes";
import { MenuListI } from "types/MenuTypes";

interface authContextI {
	user: EmployeeI | null;
	token: string | null;
	getUser: ((login: string) => void) | null;
	removeUser: (() => void) | null;
	processesList: MenuListI[] | null;
	processesLoading: boolean;
	instructionsList: InstructionList[] | null;
	instructionsLoading: boolean;
	getInstructions: ((update?: boolean) => void) | null;
	isLoading: boolean;
}

const user = localStorage.getItem("user");

export const authContextInitialValues: authContextI = {
	user: user ? JSON.parse(user) : null,
	token: null,
	getUser: null,
	removeUser: null,
	processesList: null,
	processesLoading: false,
	instructionsList: null,
	instructionsLoading: false,
	getInstructions: null,
	isLoading: false,
};

export const AuthContext = createContext(authContextInitialValues);
