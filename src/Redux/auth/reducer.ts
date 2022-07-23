import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
	loggedIn: string | null;
	tempEmail: string | null;
	tempUsername: string | null;
}

const initialState: AuthState = {
	token: localStorage.getItem("token"),
	loggedIn: localStorage.getItem("loggedIn"),
	tempEmail: localStorage.getItem("tempEmail"),
	tempUsername: localStorage.getItem("tempUsername"),
};

export const counterSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		/** Sets loggedIn to */
		login: (state, action: PayloadAction<{ token: string }>) => {
			localStorage.setItem("loggedIn", "true");
			localStorage.setItem("token", action.payload.token);

			state.loggedIn = "true";
			state.token = action.payload.token;
		},

		/** Sets temp email and username in redux and localstorage for auth purposes */
		setTempAuthData: (state, action: PayloadAction<{ email?: string; username?: string }>) => {
			if (action.payload.email) {
				localStorage.setItem("tempEmail", action.payload.email);
				state.tempEmail = action.payload.email;
			}

			if (action.payload.username) {
				localStorage.setItem("tempUsername", action.payload.username);
				state.tempUsername = action.payload.username;
			}
		},

		/** Logsout and clear all localstorage data */
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
