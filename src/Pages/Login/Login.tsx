import { useEffect, useState } from "react";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// REDUX
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { setTempAuthData, login } from "src/Redux/auth/reducer";
// API
import Api from "src/Helpers/ApiHandler";
// ICONS
import { Visibility, VisibilityOff } from "@mui/icons-material";
// IMAGES
import Logo from "src/Assets/apple-icon.png";
import SigninImage from "src/Assets/signin/sign.svg";
// STYLE
import style from "src/Pages/Login/Login.style";

const api = new Api();

const Login = (): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const tempAuth = useAppSelector((state) => state.Auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [details, setDetails] = useState<{ email: string; password: string }>({ email: tempAuth.tempEmail || "", password: "" });
	const [showpassword, setShowpassword] = useState<boolean>(false);

	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [details]); // eslint-disable-line

	/** Enter key listener */
	const keyDownHandler = (event: KeyboardEvent): void => {
		if (event.key === "Enter" && !loading) {
			event.preventDefault();
			handleLogin();
		}
	};

	/** Hide or show password */
	const handleChangeShowPassword = (): void => setShowpassword(!showpassword);

	/** Common handler for text inputs */
	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails({ ...details, [event.target.name]: event.target.value });

	/** Navigates to signup screen */
	const handleNavigateToSignup = (): void => navigate("/signup");

	/** Navigates to forgot password screen */
	const handleNavigateToForgotPassword = (): void => navigate("/forgot-password");

	/** Login event */
	const handleLogin = async (): Promise<void> => {
		setLoading(true);

		if (details.email === "" || details.password === "") {
			enqueueSnackbar("Fill all details", { variant: "warning" });
		} else {
			try {
				const response = await api.post("/auth/login", {
					data: { email: details.email, password: details.password },
				});

				dispatch(login({ token: response.data.data?.token, name: response.data.data?.name }));
				dispatch(setTempAuthData({ email: details.email }));

				enqueueSnackbar(response.data.message, { variant: "success" });
			} catch (error: any) {
				if (api.isApiError(error)) {
					enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });

					// if (error.response?.status === 405) handleSendVerifyEmailModal();
				} else console.log(error);
			}
		}

		setLoading(false);
	};

	return (
		<Grid container direction="row" height="100vh" alignItems="center" flexWrap="nowrap">
			<Grid sx={style.loginCardWrapper} container direction="column" justifyContent="center" py="50px">
				<Typography component="div" color="#EE781D" fontSize="26px" mb="30px" display="flex" alignItems="center">
					<img style={{ height: "30px", marginRight: "10px" }} src={Logo} alt="..." />
					Reactive Templates
				</Typography>
				<Typography component="h2" color="#EE781D" fontSize="30px">
					Log in to your account
				</Typography>

				<FormControl sx={{ mt: 5 }} variant="outlined" color="warning">
					<InputLabel>Email Address</InputLabel>
					<OutlinedInput label="Email Address" type="text" name="email" value={details.email} onChange={handleChangeInput} />
				</FormControl>

				<FormControl sx={{ mt: 5 }} variant="outlined" color="warning">
					<InputLabel>Password</InputLabel>
					<OutlinedInput
						type={showpassword ? "text" : "password"}
						value={details.password}
						name="password"
						label="Password"
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

				<Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
					<span onClick={handleNavigateToForgotPassword} style={{ color: "#409CB5", cursor: "pointer" }}>
						Forgot Password?
					</span>
				</Grid>

				<Grid container justifyContent={{ xs: "center", md: "space-between" }} alignItems="center" sx={{ mt: 7 }}>
					<Button sx={style.loginButton} type="submit" color="warning" variant="contained" onClick={handleLogin} disabled={loading}>
						Login
					</Button>
					<p>
						Don't have an account?{" "}
						<span onClick={handleNavigateToSignup} style={{ color: "#409CB5", cursor: "pointer" }}>
							Signup
						</span>
					</p>
				</Grid>
			</Grid>

			<Grid sx={style.imageWrapper} container justifyContent="center" alignItems="center" py="20px">
				<img style={{ height: "calc(90vh - 40px)", width: "90%" }} draggable={false} src={SigninImage} alt="..." />
			</Grid>
		</Grid>
	);
};

export default Login;
