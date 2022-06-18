import { useState } from "react";
// import { useNavigate } from "react-router";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
// components
import CommonModal from "src/Components/CommonModal/CommonModal";
// api
import axios from "axios";

interface LoginModalProps {
	openLoginModal: boolean;
	handleLoginModal: () => void;
	handleSignupModal: () => void;
	handleForgotModal: () => void;
}

const LoginModal = ({ openLoginModal, handleLoginModal, handleSignupModal, handleForgotModal }: LoginModalProps) => {
	// const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [details, setDetails] = useState({ username: "", password: "" });
	const [showpassword, setShowpassword] = useState(false);

	const handleChangeShowPassword = () => {
		setShowpassword(!showpassword);
	};

	const handleLogin = async () => {
		if (details.username === "" || details.password === "") {
			enqueueSnackbar("Fill all details", { variant: "warning" });
		} else {
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
					username: details.username,
					password: details.password,
				});

				if (response.data.status) {
					enqueueSnackbar(response.data.message, { variant: "success" });
				} else {
					enqueueSnackbar(response.data.message, { variant: "error" });
				}

				console.log(response);
			} catch (error: any) {
				enqueueSnackbar(error.response.data.message, { variant: "error" });
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

				<Button type="submit" color="primary" sx={{ mt: 2 }} variant="contained" onClick={handleLogin}>
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
