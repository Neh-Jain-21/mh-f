import { CONSTANTS } from "src/Redux/auth/action";

export type AuthState = {
	readonly loggedIn: string | null;
	readonly tempEmail: string | null;
	readonly tempUsername: string | null;
};

type AuthAction = {
	type: string;
	loggedIn: string;
	tempEmail: string;
	tempUsername: string;
};

const initState: AuthState = {
	loggedIn: localStorage.getItem("loggedIn"),
	tempEmail: localStorage.getItem("tempEmail"),
	tempUsername: localStorage.getItem("tempUsername"),
};

const authReducer = (state = initState, action: AuthAction) => {
	switch (action.type) {
		case CONSTANTS.LOGIN_SUCCESS:
			return { ...state, loggedIn: action.loggedIn };

		case CONSTANTS.SET_TEMP_DATA:
			return { ...state, ...action };

		case CONSTANTS.LOGOUT:
			return { ...state, loggedIn: null };

		default:
			return state;
	}
};

export default authReducer;
