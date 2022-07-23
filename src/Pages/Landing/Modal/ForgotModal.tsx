import { useState } from "react";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl, FormHelperText, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff, Send } from "@mui/icons-material";
import { useSnackbar } from "notistack";
// COMPONENTS
import CommonModal from "src/Components/CommonModal/CommonModal";
// API
import Api from "src/Helpers/ApiHandler";
// REDUX
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { setTempAuthData } from "src/Redux/auth/reducer";

interface ForgotModalProps {
	openForgotModal: boolean;

	/** Opens or closes forgot password modal */
	handleForgotModal: () => void;
}

const api = new Api();

const ForgotModal = ({ openForgotModal, handleForgotModal }: ForgotModalProps): JSX.Element => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();

	const tempEmail = useAppSelector((state) => state.Auth.tempEmail);

	const [details, setDetails] = useState<{ email: string; otp: string; password: string }>({ email: tempEmail || "", otp: "", password: "" });
	const [emailHelper, setEmailHelper] = useState<string>("");
	const [otpHelper, setOtpHelper] = useState<string>("");
	const [disabled, setDisabled] = useState<{ otp: boolean; password: boolean; button: boolean }>({ otp: true, password: true, button: true });
	const [loading, setLoading] = useState<{ otp: boolean; email: boolean; button: boolean }>({ otp: false, email: false, button: false });
	const [showpassword, setShowpassword] = useState<boolean>(false);

	/** Hide or show password */
	const handleChangeShowPassword = (): void => setShowpassword(!showpassword);

	/** Common handler for text inputs */
	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDetails({ ...details, [event.target.name]: event.target.value });
	};

	/** Send email event */
	const sendEmail = async (): Promise<void> => {
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
			setLoading({ ...loading, email: true });

			const response = await api.post("/auth/send-forgotpass-email", { data: { email: details.email } });

			setEmailHelper(response.data.message);
			setDisabled({ ...disabled, otp: false });
			setLoading({ ...loading, email: false });
		} catch (error: any) {
			if (api.isApiError(error)) setEmailHelper(error.response?.data?.message || "Something wrong!");
			else console.log(error);

			setLoading({ ...loading, email: false });
		}
	};

	/** Verify otp event */
	const verifyOtp = async (): Promise<void> => {
		if (details.email === "") {
			enqueueSnackbar("Enter OTP before verifying", { variant: "warning" });
		} else {
			try {
				setDisabled({ ...disabled, otp: true });

				const response = await api.post("/auth/verify-otp", { data: { email: details.email, otp: details.otp } });

				setOtpHelper(response.data.message);
				setDisabled({ password: false, button: false, otp: false });
			} catch (error: any) {
				if (api.isApiError(error)) setOtpHelper(error.response?.data?.message || "Something wrong!");
				else console.log(error);

				setDisabled({ ...disabled, otp: false });
			}
		}
	};

	/** Forgot pass event */
	const handleForgotPass = async (): Promise<void> => {
		const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

		if (details.password === "") {
			enqueueSnackbar("Enter password first", { variant: "warning" });
		} else if (!validPassword.test(details.password)) {
			enqueueSnackbar("Password must contain more than 8 characters, one lowercase, one uppercase letter and one numeric digit", {
				variant: "error",
			});
		} else {
			try {
				setDisabled({ ...disabled, button: true });

				const response = await api.post("/auth/forgotpass", { data: { email: details.email, password: details.password } });

				dispatch(setTempAuthData({ email: details.email }));

				enqueueSnackbar(response.data.message, { variant: "success" });

				setDisabled({ ...disabled, button: false });

				setTimeout(() => {
					handleForgotModal();
				}, 500);
			} catch (error: any) {
				if (api.isApiError(error)) {
					enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
					setTimeout(() => {
						handleForgotModal();
					}, 500);
				} else console.log(error);

				setDisabled({ ...disabled, button: false });
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
						name="email"
						onChange={handleChangeInput}
						endAdornment={
							loading.email ? (
								<CircularProgress size={20} />
							) : (
								<InputAdornment position="end">
									<IconButton aria-label="Send email" onClick={sendEmail}>
										<Send />
									</IconButton>
								</InputAdornment>
							)
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
						name="otp"
						onChange={handleChangeInput}
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
						name="password"
						onChange={handleChangeInput}
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
