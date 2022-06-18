export const CONSTANTS = {
	LOGIN_SUCCESS: "LOGIN_SUCCESS",
	LOGOUT: "LOGOUT",
};

const actions = {
	login: (data: { loggedIn: string }) => {
		localStorage.setItem("loggedIn", data.loggedIn);

		return { type: CONSTANTS.LOGIN_SUCCESS, ...data };
	},

	logout: () => {
		localStorage.removeItem("loggedIn");

		return { type: CONSTANTS.LOGOUT };
	},
};

export default actions;
