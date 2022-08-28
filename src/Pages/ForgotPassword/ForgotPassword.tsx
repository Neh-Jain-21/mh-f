import { useState } from "react";
import { Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// REDUX
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { setTempAuthData } from "src/Redux/auth/reducer";
// API
import Api from "src/Helpers/ApiHandler";
// ICONS
import { Send, Visibility, VisibilityOff } from "@mui/icons-material";
// IMAGES
import Logo from "src/Assets/apple-icon.png";
import ForgotPasswordImage from "src/Assets/forgotpassword/forgot-password.svg";
// STYLE
import style from "src/Pages/ForgotPassword/ForgotPassword.style";

const api = new Api();

const ForgotPassword = (): JSX.Element => {
	const navigate = useNavigate();
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

				navigate("/");
			} catch (error: any) {
				if (api.isApiError(error)) {
					enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
				} else console.log(error);

				setDisabled({ ...disabled, button: false });
			}
		}
	};

	return (
		<Grid container direction="row" height="100vh" alignItems={{ xs: "unset", md: "center" }} flexWrap="nowrap">
			<Grid sx={style.forgotPassCardWrapper} container direction="column" justifyContent={{ xs: "unset", md: "center" }} py="50px">
				<Typography component="div" color="#5FC690" fontSize="26px" mb="30px" display="flex" alignItems="center">
					<img style={{ height: "30px", marginRight: "10px" }} src={Logo} alt="..." />
					Reactive Templates
				</Typography>
				<Typography component="h2" color="#5FC690" fontSize="30px">
					Reset your password
				</Typography>

				<FormControl sx={{ mt: 5, ...style.inputGreen }} variant="outlined">
					<InputLabel htmlFor="forgot-email">Email Address</InputLabel>
					<OutlinedInput
						type="email"
						name="email"
						id="forgot-email"
						label="Email Address"
						value={details.email}
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

				<FormControl sx={{ mt: 3, ...style.inputGreen }} variant="outlined">
					<InputLabel htmlFor="forgot-otp">OTP</InputLabel>
					<OutlinedInput
						name="otp"
						type="text"
						label="OTP"
						id="forgot-otp"
						disabled={disabled.otp}
						value={details.otp}
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

				<FormControl sx={{ mt: 3, ...style.inputGreen }} variant="outlined">
					<InputLabel htmlFor="forgot-password">New Password</InputLabel>
					<OutlinedInput
						name="password"
						id="forgot-password"
						label="New Password"
						value={details.password}
						disabled={disabled.password}
						onChange={handleChangeInput}
						type={showpassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton disabled={disabled.password} aria-label="toggle password visibility" onClick={handleChangeShowPassword}>
									{showpassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<Button sx={style.resetPasswordButton} type="submit" color="warning" variant="contained" onClick={handleForgotPass} disabled={disabled.button}>
					Reset Password
				</Button>
			</Grid>

			<Grid sx={style.imageWrapper} container justifyContent="center" alignItems="center" py="20px">
				<img style={{ height: "calc(90vh - 40px)", width: "90%" }} src={ForgotPasswordImage} alt="..." />
			</Grid>
		</Grid>
	);
};

export default ForgotPassword;
