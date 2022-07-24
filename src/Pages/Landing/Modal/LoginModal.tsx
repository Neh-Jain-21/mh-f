import { useEffect, useState } from "react";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
// COMPONENTS
import CommonModal from "src/Components/CommonModal/CommonModal";
// API
import Api from "src/Helpers/ApiHandler";
// REDUX
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { setTempAuthData, login } from "src/Redux/auth/reducer";

interface LoginModalProps {
	openLoginModal: boolean;

	/** Opens or closes login modal */
	handleLoginModal: () => void;

	/** Opens or closes signup modal */
	handleSignupModal: () => void;

	/** Opens or closes forgot password modal */
	handleForgotModal: () => void;

	/** Opens or closes verify email modal */
	handleSendVerifyEmailModal: () => void;
}

const api = new Api();

const LoginModal = ({ openLoginModal, handleLoginModal, handleSignupModal, handleForgotModal, handleSendVerifyEmailModal }: LoginModalProps): JSX.Element => {
	// const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const tempAuth = useAppSelector((state) => state.Auth);

	const [details, setDetails] = useState<{ username: string; password: string }>({ username: tempAuth.tempUsername || tempAuth.tempEmail || "", password: "" });
	const [showpassword, setShowpassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [details]);

	/** Enter key listener */
	const keyDownHandler = (event: KeyboardEvent): void => {
		if (event.key === "Enter" && !loading) {
			event.preventDefault();
			handleLogin();
		}
	};

	/** Hide or show password */
	const handleChangeShowPassword = (): void => setShowpassword(!showpassword);

	/** Common function for forgot modal and signup modal */
	const handleForgotOrSignupModal = (callBack: () => void) => () => {
		handleLoginModal();
		setTimeout(callBack, 500);
	};

	/** Common handler for text inputs */
	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDetails({ ...details, [event.target.name]: event.target.value });
	};

	/** Login event */
	const handleLogin = async (): Promise<void> => {
		setLoading(true);

		if (details.username === "" || details.password === "") {
			enqueueSnackbar("Fill all details", { variant: "warning" });
		} else {
			try {
				const response = await api.post("/auth/login", {
					data: { username: details.username, password: details.password },
				});

				dispatch(login({ token: response.data.data?.token, name: response.data.data?.name }));
				dispatch(setTempAuthData({ [details.username.includes("@") ? "email" : "username"]: details.username }));

				enqueueSnackbar(response.data.message, { variant: "success" });
			} catch (error: any) {
				if (api.isApiError(error)) {
					enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });

					if (error.response?.status === 405) handleSendVerifyEmailModal();
				} else console.log(error);
			}
		}

		setLoading(false);
	};

	return (
		<CommonModal title="Login" modalOpen={openLoginModal} handleChangeModal={handleLoginModal}>
			<Grid container direction="column">
				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel>Username or Email</InputLabel>
					<Input type="text" name="username" value={details.username} onChange={handleChangeInput} />
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel>Password</InputLabel>
					<Input
						type={showpassword ? "text" : "password"}
						value={details.password}
						name="password"
						onChange={handleChangeInput}
						endAdornment={
							<InputAdornment position="end">
								<IconButton aria-label="toggle password visibility" onClick={handleChangeShowPassword}>
									{showpassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
					<span onClick={handleForgotOrSignupModal(handleForgotModal)} style={{ color: "blue", cursor: "pointer" }}>
						Forgot Password
					</span>
				</Grid>

				<Button type="submit" color="primary" sx={{ mt: 2 }} variant="contained" onClick={handleLogin} disabled={loading}>
					Log in with email
				</Button>

				<Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
					<p>
						New User?{" "}
						<span onClick={handleForgotOrSignupModal(handleSignupModal)} style={{ color: "blue", cursor: "pointer" }}>
							Signup Here
						</span>
					</p>
				</Grid>
			</Grid>
		</CommonModal>
	);
};

export default LoginModal;
