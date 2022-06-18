import { useState } from "react";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff, Send } from "@mui/icons-material";
import { useSnackbar } from "notistack";
// components
import CommonModal from "src/Components/CommonModal/CommonModal";
// api
import axios from "axios";

interface ForgotModalProps {
	openForgotModal: boolean;
	handleForgotModal: () => void;
}

const ForgotModal = ({ openForgotModal, handleForgotModal }: ForgotModalProps) => {
	const { enqueueSnackbar } = useSnackbar();

	const [details, setDetails] = useState({ email: "", otp: "", password: "" });
	const [emailHelper, setEmailHelper] = useState("");
	const [otpHelper, setOtpHelper] = useState("");
	const [disabled, setDisabled] = useState({ otp: true, password: true, button: true });
	const [showpassword, setShowpassword] = useState(false);

	const handleChangeShowPassword = () => {
		setShowpassword(!showpassword);
	};

	const sendEmail = async () => {
		if (details.email === "") {
			enqueueSnackbar("Enter Email before sending", { variant: "warning" });
		} else {
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-forgotpass-email`, { email: details.email });

				if (response.data.status) {
					setEmailHelper(response.data.message);
					setDisabled({ ...disabled, otp: false });
				} else {
					setEmailHelper(response.data.message);
				}
			} catch (error: any) {
				enqueueSnackbar(error.response.data.message, { variant: "error" });
			}
		}
	};

	const verifyOtp = async () => {
		if (details.email === "") {
			enqueueSnackbar("Enter OTP before verifying", { variant: "warning" });
		} else {
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-otp`, { email: details.email, otp: details.otp });

				if (response.data.status) {
					setOtpHelper(response.data.message);
					setDisabled({ ...disabled, password: false, button: false });
				} else {
					setOtpHelper(response.data.message);
				}
			} catch (error: any) {
				enqueueSnackbar(error.response.data.message, { variant: "error" });
			}
		}
	};

	const handleForgotPass = async () => {
		const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

		if (details.password === "") {
			enqueueSnackbar("Enter password first", { variant: "warning" });
		} else if (!validPassword.test(details.password)) {
			enqueueSnackbar("Password must contain more than 8 characters, one lowercase, one uppercase letter and one numeric digit", {
				variant: "error",
			});
		} else {
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgotpass`, {
					email: details.email,
					password: details.password,
				});

				if (response.data.status) {
					enqueueSnackbar(response.data.message, { variant: "success" });

					setTimeout(() => {
						handleForgotModal();
					}, 500);
				} else {
					enqueueSnackbar(response.data.message, { variant: "error" });

					setTimeout(() => {
						handleForgotModal();
					}, 500);
				}
			} catch (error: any) {
				enqueueSnackbar(error.response.data.message, { variant: "error" });
			}
		}
	};

	return (
		<CommonModal title="Forgot Password" modalOpen={openForgotModal} handleChangeModal={handleForgotModal}>
			<Grid container direction="column">
				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="forgot-email">Email Address</InputLabel>
					<Input
						id="forgot-email"
						type="email"
						value={details.email}
						onChange={(event) => setDetails({ ...details, email: event.target.value })}
						endAdornment={
							<InputAdornment position="end">
								<IconButton aria-label="Send email" onClick={sendEmail}>
									<Send />
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText>{emailHelper}</FormHelperText>
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="forgot-otp">OTP</InputLabel>
					<Input
						id="forgot-otp"
						type="text"
						disabled={disabled.otp}
						value={details.otp}
						onChange={(event) => setDetails({ ...details, otp: event.target.value })}
						endAdornment={
							<InputAdornment position="end">
								<Button disabled={disabled.otp} size="small" onClick={verifyOtp}>
									Verify
								</Button>
							</InputAdornment>
						}
					/>
					<FormHelperText>{otpHelper}</FormHelperText>
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="forgot-password">New Password</InputLabel>
					<Input
						id="forgot-password"
						disabled={disabled.password}
						type={showpassword ? "text" : "password"}
						value={details.password}
						onChange={(event) => setDetails({ ...details, password: event.target.value })}
						endAdornment={
							<InputAdornment position="end">
								<IconButton disabled={disabled.password} aria-label="toggle password visibility" onClick={handleChangeShowPassword}>
									{showpassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<Button variant="contained" color="primary" type="submit" onClick={handleForgotPass} disabled={disabled.button} sx={{ mt: 3, mb: 2 }}>
					Reset Password
				</Button>
			</Grid>
		</CommonModal>
	);
};

export default ForgotModal;
