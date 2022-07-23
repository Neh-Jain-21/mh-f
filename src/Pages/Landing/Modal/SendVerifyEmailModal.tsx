import { useState } from "react";
import { IconButton, Grid, Input, InputAdornment, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
// COMPONENTS
import CommonModal from "src/Components/CommonModal/CommonModal";
// API
import Api from "src/Helpers/ApiHandler";
// REDUX
import { useAppSelector, useAppDispatch } from "src/Redux/hooks";
import { setTempAuthData } from "src/Redux/auth/reducer";

interface ForgotModalProps {
	openSendVerifyEmailModal: boolean;

	/** Opens or closes verify email modal */
	handleSendVerifyEmailModal: () => void;
}

const api = new Api();

const SendVerifyEmailModal = ({ openSendVerifyEmailModal, handleSendVerifyEmailModal }: ForgotModalProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const tempEmail = useAppSelector((state) => state.Auth.tempEmail);

	const [details, setDetails] = useState<{ email: string }>({ email: tempEmail || "" });
	const [emailHelper, setEmailHelper] = useState<string>("");

	/** Common handler for text inputs */
	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDetails({ ...details, [event.target.name]: event.target.value });
	};

	/** Send email again event */
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
			const response = await api.post("/auth/resend-verify-email", { data: { email: details.email } });

			dispatch(setTempAuthData({ email: details.email }));
			setEmailHelper(response.data.message);

			setTimeout(() => {
				handleSendVerifyEmailModal();
			}, 2000);
		} catch (error: any) {
			if (api.isApiError(error)) setEmailHelper(error.response?.data?.message || "Something wrong!");
			else console.log(error);
		}
	};

	return (
		<CommonModal title="Resend Verify Email" modalOpen={openSendVerifyEmailModal} handleChangeModal={handleSendVerifyEmailModal}>
			<Grid container direction="column">
				<FormControl sx={{ my: 3 }} variant="standard">
					<InputLabel htmlFor="forgot-email">Email Address</InputLabel>
					<Input
						id="forgot-email"
						type="email"
						value={details.email}
						name="email"
						onChange={handleChangeInput}
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
			</Grid>
		</CommonModal>
	);
};

export default SendVerifyEmailModal;
