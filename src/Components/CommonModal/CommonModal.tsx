import { IconButton, Grid, Modal, Slide } from "@mui/material";
import { Close } from "@mui/icons-material";
// STYLES
import style from "src/Components/CommonModal/CommonModal.style";

interface CommonModalProps {
	children: JSX.Element;

	/**
	 * Title of modal to show.
	 */
	title: string;

	/**
	 * If true, the component is shown
	 */
	modalOpen: boolean;

	/**
	 * Callback fired when the component requests to be closed.
	 */
	handleChangeModal: () => void;
}

const CommonModal = (props: CommonModalProps): JSX.Element => (
	<Modal open={props.modalOpen} onClose={props.handleChangeModal} closeAfterTransition BackdropProps={{ timeout: 1000 }} sx={style.modalStyle}>
		<Slide direction="up" in={props.modalOpen}>
			<Grid sx={style.modalContainer}>
				<Grid container justifyContent="space-between" alignItems="center">
					<h2>{props.title}</h2>
					<IconButton edge="start" onClick={props.handleChangeModal} color="inherit">
						<Close />
					</IconButton>
				</Grid>
				{props.children}
			</Grid>
		</Slide>
	</Modal>
);

export default CommonModal;
