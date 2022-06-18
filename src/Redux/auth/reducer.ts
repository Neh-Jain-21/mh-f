import { CONSTANTS } from "src/Redux/auth/action";

export type AuthState = {
	readonly loggedIn: string | null;
};

type AuthAction = {
	type: string;
	loggedIn: string;
};

const initState: AuthState = { loggedIn: localStorage.getItem("loggedIn") };

const authReducer = (state = initState, action: AuthAction) => {
	switch (action.type) {
		case CONSTANTS.LOGIN_SUCCESS:
			return { ...state, loggedIn: action.loggedIn };

		case CONSTANTS.LOGOUT:
			return { ...state, loggedIn: null };

		default:
			return state;
	}
};

export default authReducer;
