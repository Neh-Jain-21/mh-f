import { IconButton, Grid, Modal, Slide } from "@mui/material";
import { Close } from "@mui/icons-material";

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

const CommonModal = (props: CommonModalProps) => {
	return (
		<Modal
			open={props.modalOpen}
			onClose={props.handleChangeModal}
			closeAfterTransition
			BackdropProps={{ timeout: 1000 }}
			sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
		>
			<Slide direction="up" in={props.modalOpen}>
				<Grid
					sx={{
						width: "90vw",
						maxWidth: 400,
						border: "2px solid #000",
						boxShadow: (theme) => theme.shadows[5],
						padding: (theme) => theme.spacing(1, 3, 1),
						bgcolor: (theme) => theme.palette.background.paper,
					}}
				>
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
};

export default CommonModal;
