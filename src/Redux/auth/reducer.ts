import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
	name: string | null;
	loggedIn: string | null;
	tempEmail: string | null;
}

const initialState: AuthState = {
	token: localStorage.getItem("token"),
	name: localStorage.getItem("name"),
	loggedIn: localStorage.getItem("loggedIn"),
	tempEmail: localStorage.getItem("tempEmail"),
};

export const counterSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		/** Sets loggedIn and user data */
		login: (state, action: PayloadAction<{ token: string; name: string }>) => {
			localStorage.setItem("loggedIn", "true");
			localStorage.setItem("name", action.payload.name);
			localStorage.setItem("token", action.payload.token);

			state.loggedIn = "true";
			state.name = action.payload.name;
			state.token = action.payload.token;
		},

		/** Sets temp email in redux and localstorage for auth purposes */
		setTempAuthData: (state, action: PayloadAction<{ email?: string }>) => {
			if (action.payload.email) {
				localStorage.setItem("tempEmail", action.payload.email);
				state.tempEmail = action.payload.email;
			}
		},

		/** Logsout and clear all localstorage and redux data */
		logout: (state) => {
			localStorage.clear();

			(Object.keys(state) as (keyof typeof state)[]).forEach((value) => {
				state[value] = null;
			});
		},
	},
});

export const { login, setTempAuthData, logout } = counterSlice.actions;

export default counterSlice.reducer;
