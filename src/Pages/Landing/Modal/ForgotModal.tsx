import { useState } from "react";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff, Send } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//REDUX
import actions from "src/Redux/auth/action";
// COMPONENTS
import CommonModal from "src/Components/CommonModal/CommonModal";
// API
import Api from "src/Helpers/ApiHandler";
// TYPES
import { reducerTypes } from "src/Redux/reducers";

interface ForgotModalProps {
	openForgotModal: boolean;
	handleForgotModal: () => void;
}

const api = new Api();

const ForgotModal = ({ openForgotModal, handleForgotModal }: ForgotModalProps) => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	const tempEmail = useSelector((state: reducerTypes) => state.Auth.tempEmail);

	const [details, setDetails] = useState({ email: tempEmail || "", otp: "", password: "" });
	const [emailHelper, setEmailHelper] = useState("");
	const [otpHelper, setOtpHelper] = useState("");
	const [disabled, setDisabled] = useState({ otp: true, password: true, button: true });
	const [showpassword, setShowpassword] = useState(false);

	const handleChangeShowPassword = () => setShowpassword(!showpassword);

	const sendEmail = async () => {
		const validEmail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // eslint-disable-line

		if (details.email === "") {
			enqueueSnackbar("Enter Email before sending", { variant: "warning" });
			return;
		}

		if (!validEmail.test(details.email)) {
			enqueueSnackbar("Bad Email", { variant: "error" });
			return;
		}

		try {
			const response = await api.post("/auth/send-forgotpass-email", { data: { email: details.email } });

			setEmailHelper(response.data.message);
			setDisabled({ ...disabled, otp: false });
		} catch (error: any) {
			if (api.isApiError(error)) setEmailHelper(error.response?.data.message || "Something wrong!");
			else console.log(error);
		}
	};

	const verifyOtp = async () => {
		if (details.email === "") {
			enqueueSnackbar("Enter OTP before verifying", { variant: "warning" });
		} else {
			try {
				const response = await api.post("/auth/verify-otp", { data: { email: details.email, otp: details.otp } });

				setOtpHelper(response.data.message);
				setDisabled({ ...disabled, password: false, button: false });
			} catch (error: any) {
				if (api.isApiError(error)) setOtpHelper(error.response?.data.message || "Something wrong!");
				else console.log(error);
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
				const response = await api.post("/auth/forgotpass", { data: { email: details.email, password: details.password } });

				dispatch(actions.setTempAuthData({ email: details.email }));

				enqueueSnackbar(response.data.message, { variant: "success" });

				setTimeout(() => {
					handleForgotModal();
				}, 500);
			} catch (error: any) {
				if (api.isApiError(error)) {
					enqueueSnackbar(error.response?.data.message, { variant: "error" });
					setTimeout(() => {
						handleForgotModal();
					}, 500);
				} else console.log(error);
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
