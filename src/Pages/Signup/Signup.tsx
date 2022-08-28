import { useEffect, useState } from "react";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// REDUX
import { useAppDispatch } from "src/Redux/hooks";
import { setTempAuthData } from "src/Redux/auth/reducer";
// API
import Api from "src/Helpers/ApiHandler";
// ICONS
import { Visibility, VisibilityOff } from "@mui/icons-material";
// IMAGES
import Logo from "src/Assets/apple-icon.png";
import SignupImage from "src/Assets/signup/signup.svg";
// STYLE
import style from "src/Pages/Signup/Signup.style";

const api = new Api();

const Signup = (): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const [loading, setLoading] = useState<boolean>(false);
	const [details, setDetails] = useState<{ email: string; password: string }>({ email: "", password: "" });
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
			signupUser();
		}
	};

	/** Hide or show password */
	const handleChangeShowPassword = (): void => setShowpassword(!showpassword);

	/** Common handler for text inputs */
	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails({ ...details, [event.target.name]: event.target.value });

	/** Navigates to signup screen */
	const handleNavigateToLogin = (): void => navigate("/login");

	/** Signup event */
	const signupUser = async () => {
		setLoading(true);

		const validEmail =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // eslint-disable-line
		const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

		if (details.email === "" || details.password === "") {
			enqueueSnackbar("Fill All Details", { variant: "warning" });
		} else {
			if (!validEmail.test(details.email)) {
				enqueueSnackbar("Bad Email", { variant: "error" });
			} else if (!validPassword.test(details.password)) {
				enqueueSnackbar("Password must contain more than 8 characters, one lowercase, one uppercase letter and one numeric digit", {
					variant: "error",
				});
			} else {
				try {
					const response = await api.post("/auth/signup", {
						data: { email: details.email, password: details.password },
					});

					dispatch(setTempAuthData({ email: details.email }));

					enqueueSnackbar(response.data.message, { variant: "success" });
				} catch (error: any) {
					if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
					else console.log(error);
				}
			}
		}

		setLoading(false);
	};

	return (
		<Grid container direction="row" height="100vh" alignItems={{ xs: "unset", md: "center" }} flexWrap="nowrap">
			<Grid sx={style.signupCardWrapper} container direction="column" justifyContent={{ xs: "unset", md: "center" }} py="50px">
				<Typography component="div" color="#77536F" fontSize="26px" mb="30px" display="flex" alignItems="center">
					<img style={{ height: "30px", marginRight: "10px" }} src={Logo} alt="..." />
					Reactive Templates
				</Typography>
				<Typography component="h2" color="#77536F" fontSize="30px">
					Create your account
				</Typography>

				<FormControl sx={{ mt: 5 }} variant="outlined" color="secondary">
					<InputLabel>Email Address</InputLabel>
					<OutlinedInput label="Email Address" type="text" name="email" value={details.email} onChange={handleChangeInput} />
				</FormControl>

				<FormControl sx={{ mt: 5 }} variant="outlined" color="secondary">
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

				<Grid container justifyContent={{ xs: "center", md: "space-between" }} alignItems="center" sx={{ mt: 7 }}>
					<Button sx={style.signupButton} type="submit" variant="contained" onClick={signupUser} disabled={loading}>
						Signup
					</Button>
					<p>
						Already have an account?{" "}
						<span onClick={handleNavigateToLogin} style={{ color: "#A9A5C6", cursor: "pointer" }}>
							Login
						</span>
					</p>
				</Grid>
			</Grid>

			<Grid sx={style.imageWrapper} container justifyContent="center" alignItems="center" py="20px">
				<img style={{ height: "calc(99vh - 40px)", width: "95%" }} draggable={false} src={SignupImage} alt="..." />
			</Grid>
		</Grid>
	);
};

export default Signup;
