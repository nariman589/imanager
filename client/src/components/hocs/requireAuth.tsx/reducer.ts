import {
	GET_INSTRUCTIONS,
	GET_INSTRUCTIONS_BEGIN,
	GET_PROCESSES_BEGIN,
	GET_PROCESSES_SUCCES,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REMOVE_USER,
} from "./actions";

const reducer = (state: any, action: any) => {
	if (action.type === REGISTER_USER_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === REGISTER_USER_SUCCESS) {
		return {
			...state,
			user: action.payload,
			isLoading: false,
		};
	}
	if (action.type === REMOVE_USER) {
		return {
			...state,
			user: null,
			isLoading: false,
		};
	}
	if (action.type === GET_PROCESSES_BEGIN) {
		return {
			...state,
			processesLoading: true,
		};
	}
	if (action.type === GET_PROCESSES_SUCCES) {
		return {
			...state,
			processesList: action.payload,
			processesLoading: false,
		};
	}
	if (action.type === GET_INSTRUCTIONS_BEGIN) {
		return {
			...state,
			instructionsLoading: true,
		};
	}
	if (action.type === GET_INSTRUCTIONS) {
		return {
			...state,
			instructionsList: action.payload,
			instructionsLoading: false,
		};
	}
	throw new Error("no such action");
};

export default reducer;
