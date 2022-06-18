import Auth, { AuthState } from "src/Redux/auth/reducer";

// TYPES
export type reducerTypes = {
	Auth: AuthState;
};

const reducers = { Auth };

export default reducers;
