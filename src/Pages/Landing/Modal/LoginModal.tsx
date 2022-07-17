import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
//REDUX
import actions from "src/Redux/auth/action";
// COMPONENTS
import CommonModal from "src/Components/CommonModal/CommonModal";
// API
import Api from "src/Helpers/ApiHandler";
// TYPES
import { reducerTypes } from "src/Redux/reducers";

interface LoginModalProps {
	openLoginModal: boolean;
	handleLoginModal: () => void;
	handleSignupModal: () => void;
	handleForgotModal: () => void;
	handleSendVerifyEmailModal: () => void;
}

const api = new Api();

const LoginModal = ({ openLoginModal, handleLoginModal, handleSignupModal, handleForgotModal, handleSendVerifyEmailModal }: LoginModalProps) => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const tempAuth = useSelector((state: reducerTypes) => state.Auth);

	const [details, setDetails] = useState({ username: tempAuth.tempUsername || tempAuth.tempEmail || "", password: "" });
	const [showpassword, setShowpassword] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [details]);

	const keyDownHandler = (event: KeyboardEvent) => {
		if (event.key === "Enter" && !loading) {
			event.preventDefault();
			handleLogin();
		}
	};

	const handleChangeShowPassword = () => setShowpassword(!showpassword);

	const handleLogin = async () => {
		setLoading(true);

		if (details.username === "" || details.password === "") {
			enqueueSnackbar("Fill all details", { variant: "warning" });
		} else {
			try {
				const response = await api.post("/auth/login", {
					data: { username: details.username, password: details.password },
				});

				dispatch(actions.setTempAuthData({ [details.username.includes("@") ? "email" : "username"]: details.username }));

				enqueueSnackbar(response.data.message, { variant: "success" });
			} catch (error: any) {
				if (api.isApiError(error)) {
					enqueueSnackbar(error.response?.data.message, { variant: "error" });

					if (error.response?.status === 405) handleSendVerifyEmailModal();
				} else console.log(error);
			}

			// if (data.msg) {
			// 	setLogindetails({
			// 		username: "",
			// 		password: "",
			// 	});
			// 	handleLoginModal();
			// 	enqueueSnackbar(data.msg, { variant: "success" });
			// 	// history.push("/Dashboard");
			// } else {
			// 	enqueueSnackbar(data.err, { variant: "error" });
			// }
		}

		setLoading(false);
	};

	return (
		<CommonModal title="Login" modalOpen={openLoginModal} handleChangeModal={handleLoginModal}>
			<Grid container direction="column">
				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel>Username or Email</InputLabel>
					<Input type="text" value={details.username} onChange={(event) => setDetails({ ...details, username: event.target.value })} />
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel>Password</InputLabel>
					<Input
						type={showpassword ? "text" : "password"}
						value={details.password}
						onChange={(event) => setDetails({ ...details, password: event.target.value })}
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
					<span
						onClick={() => {
							handleLoginModal();
							setTimeout(handleForgotModal, 500);
						}}
						style={{ color: "blue", cursor: "pointer" }}
					>
						Forgot Password
					</span>
				</Grid>

				<Button type="submit" color="primary" sx={{ mt: 2 }} variant="contained" onClick={handleLogin} disabled={loading}>
					Log in with email
				</Button>

				<Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
					<p>
						New User?{" "}
						<span
							onClick={() => {
								handleLoginModal();
								setTimeout(handleSignupModal, 500);
							}}
							style={{ color: "blue", cursor: "pointer" }}
						>
							Signup Here
						</span>
					</p>
				</Grid>
			</Grid>
		</CommonModal>
	);
};

export default LoginModal;
