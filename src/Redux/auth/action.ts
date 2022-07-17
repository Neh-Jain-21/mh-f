export const CONSTANTS = {
	LOGIN_SUCCESS: "LOGIN_SUCCESS",
	SET_TEMP_DATA: "SET_TEMP_DATA",
	LOGOUT: "LOGOUT",
};

const actions = {
	login: (data: { loggedIn: string }) => {
		localStorage.setItem("loggedIn", data.loggedIn);

		return { type: CONSTANTS.LOGIN_SUCCESS, ...data };
	},

	/**
	 * Sets temp email and username in redux and localstorage for auth purposes
	 * @param data object of data to update
	 * @returns disptach object
	 */
	setTempAuthData: (data: { email?: string; username?: string }) => {
		data.email && localStorage.setItem("tempEmail", data.email);
		data.username && localStorage.setItem("tempUsername", data.username);

		return { type: CONSTANTS.SET_TEMP_DATA, ...data };
	},

	logout: () => {
		localStorage.clear();

		return { type: CONSTANTS.LOGOUT };
	},
};

export default actions;
