import { useState } from "react";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
// components
import CommonModal from "src/Components/CommonModal/CommonModal";
// api
import axios from "axios";

interface SignUpModalProps {
	openSignupModal: boolean;
	handleLoginModal: () => void;
	handleSignupModal: () => void;
}

const SignupModal = ({ openSignupModal, handleLoginModal, handleSignupModal }: SignUpModalProps) => {
	const { enqueueSnackbar } = useSnackbar();

	const [details, setDetails] = useState({ username: "", email: "", password: "" });
	const [showpassword, setShowpassword] = useState(false);

	const handleChangeShowPassword = () => {
		setShowpassword(!showpassword);
	};

	const signupUser = async () => {
		const validEmail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // eslint-disable-line
		const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
		const validUsername = /^[a-z0-9_\.]+$/; // eslint-disable-line

		if (details.email === "" || details.username === "" || details.password === "") {
			enqueueSnackbar("Fill All Details", { variant: "warning" });
		} else {
			if (!validEmail.test(details.email)) {
				enqueueSnackbar("Bad Email", { variant: "error" });
			} else if (!validPassword.test(details.password)) {
				enqueueSnackbar("Password must contain more than 8 characters, one lowercase, one uppercase letter and one numeric digit", {
					variant: "error",
				});
			} else if (!validUsername.test(details.username)) {
				enqueueSnackbar("Username can only contain lowercase letters, numbers, dots(.) and underscores (_)", {
					variant: "error",
				});
			} else {
				try {
					const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
						username: details.username,
						email: details.email,
						password: details.password,
					});

					if (response.data.status) {
						enqueueSnackbar(response.data.message, { variant: "success" });

						handleSignupModal();
					} else {
						enqueueSnackbar(response.data.message, { variant: "error" });
					}

					console.log(response);
				} catch (error: any) {
					enqueueSnackbar(error.response.data.message, { variant: "error" });
				}
			}
		}
	};

	return (
		<CommonModal title="Signup" modalOpen={openSignupModal} handleChangeModal={handleSignupModal}>
			<Grid container direction="column">
				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="signup-username">Username</InputLabel>
					<Input
						id="signup-username"
						type="text"
						value={details.username}
						onChange={(event) => setDetails({ ...details, username: event.target.value })}
					/>
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="Signup-email">Email Address</InputLabel>
					<Input
						id="Signup-email"
						type="text"
						value={details.email}
						onChange={(event) => setDetails({ ...details, email: event.target.value })}
					/>
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="Signup-password">Password</InputLabel>
					<Input
						id="Signup-password"
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

				<Button variant="contained" color="primary" sx={{ mt: 2 }} type="submit" onClick={signupUser}>
					Sign up with email
				</Button>

				<Grid sx={{ mt: 1 }} container direction="row" justifyContent="flex-end">
					<p>
						Already User?{" "}
						<span
							onClick={() => {
								handleSignupModal();
								setTimeout(handleLoginModal, 500);
							}}
							style={{ color: "blue", cursor: "pointer" }}
						>
							Login Instead
						</span>
					</p>
				</Grid>
			</Grid>
		</CommonModal>
	);
};

export default SignupModal;
