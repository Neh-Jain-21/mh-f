import { useEffect, useState } from "react";
import { IconButton, Button, Grid, Input, InputAdornment, InputLabel, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
// COMPONENTS
import CommonModal from "src/Components/CommonModal/CommonModal";
// API
import Api from "src/Helpers/ApiHandler";
// REDUX
import { useAppDispatch } from "src/Redux/hooks";
import { setTempAuthData } from "src/Redux/auth/reducer";

interface SignUpModalProps {
	openSignupModal: boolean;

	/** Opens or closes login modal */
	handleLoginModal: () => void;

	/** Opens or closes signup modal */
	handleSignupModal: () => void;
}

const api = new Api();

const SignupModal = ({ openSignupModal, handleLoginModal, handleSignupModal }: SignUpModalProps): JSX.Element => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();

	const [details, setDetails] = useState<{ username: string; email: string; password: string }>({ username: "", email: "", password: "" });
	const [showpassword, setShowpassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [details]);

	/** Enter key listener */
	const keyDownHandler = (event: KeyboardEvent) => {
		if (event.key === "Enter" && !loading) {
			event.preventDefault();
			signupUser();
		}
	};

	/** Hide or show password */
	const handleChangeShowPassword = () => setShowpassword(!showpassword);

	/** Common handler for text inputs */
	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDetails({ ...details, [event.target.name]: event.target.value });
	};

	/** Signup event */
	const signupUser = async () => {
		setLoading(true);

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
					const response = await api.post("/auth/signup", {
						data: { username: details.username, email: details.email, password: details.password },
					});

					dispatch(setTempAuthData({ email: details.email, username: details.username }));

					enqueueSnackbar(response.data.message, { variant: "success" });
					handleSignupModal();
				} catch (error: any) {
					if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
					else console.log(error);
				}
			}
		}

		setLoading(false);
	};

	return (
		<CommonModal title="Signup" modalOpen={openSignupModal} handleChangeModal={handleSignupModal}>
			<Grid container direction="column">
				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="signup-username">Username</InputLabel>
					<Input id="signup-username" type="text" name="username" value={details.username} onChange={handleChangeInput} />
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="Signup-email">Email Address</InputLabel>
					<Input id="Signup-email" type="text" name="email" value={details.email} onChange={handleChangeInput} />
				</FormControl>

				<FormControl sx={{ mt: 1 }} variant="standard">
					<InputLabel htmlFor="Signup-password">Password</InputLabel>
					<Input
						id="Signup-password"
						type={showpassword ? "text" : "password"}
						name="password"
						value={details.password}
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

				<Button variant="contained" color="primary" sx={{ mt: 2 }} type="submit" onClick={signupUser} disabled={loading}>
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
