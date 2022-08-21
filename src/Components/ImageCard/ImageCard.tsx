import { useState } from "react";
import {
	Button,
	Grid,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Zoom,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	Modal,
	Fade,
	Switch,
	Backdrop,
	Box,
} from "@mui/material";
import { useSnackbar } from "notistack";
// STYLE
import style from "src/Components/ImageCard/ImageCard.style";
// API
import Api from "src/Helpers/ApiHandler";

const api = new Api();

interface ImageCardProps {
	image: string;
	title: string;
	caption: string;
	isPrivate: boolean;
}

const ImageCard = (props: ImageCardProps) => {
	const { enqueueSnackbar } = useSnackbar();

	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");
	const [open, setOpen] = useState(false);
	const [openedit, setOpenedit] = useState(false);
	const [publicPost, setPublicPost] = useState(true);

	const deletePhoto = async () => {
		try {
			const response = await api.delete("/images/delete");

			enqueueSnackbar(response.data.message, { variant: "success" });
			setOpen(false);
		} catch (error) {
			if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
			else console.log(error);
		}
	};

	const editDetails = async () => {
		if (title === "" || caption === "") {
			enqueueSnackbar("Fill All Details", { variant: "warning" });
		} else {
			try {
				const response = await api.post("/images/edit");

				enqueueSnackbar(response.data.message, { variant: "success" });
				setOpenedit(false);
			} catch (error) {
				if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
				else console.log(error);
			}
		}
	};

	return (
		<>
			{/* Confirm Delete Dialog */}
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete Photo"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Your photo will be deleted permanently!</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							deletePhoto();
						}}
						color="secondary"
						autoFocus
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			{/* Edit Modal */}
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				sx={style.modal}
				open={openedit}
				onClose={() => {
					setOpenedit(false);
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={openedit}>
					<Box id="transition-modal-description" sx={style.paper}>
						<h2 id="transition-modal-title">Edit Photo</h2>
						<Grid container direction="column">
							<form noValidate autoComplete="off">
								<TextField
									fullWidth
									variant="standard"
									placeholder={props.title}
									value={title}
									onChange={(event) => {
										setTitle(event.target.value);
									}}
								/>
								<div style={{ paddingTop: 20 }}></div>
								<TextField
									fullWidth
									variant="standard"
									placeholder={props.caption}
									value={caption}
									onChange={(event) => {
										setCaption(event.target.value);
									}}
								/>
								<Grid container direction="row" alignItems="center" justifyContent="center">
									<h4>Keep Private?</h4>
									<Switch
										checked={publicPost}
										onChange={(e) => {
											setPublicPost(e.target.checked);
										}}
										color="primary"
									/>
								</Grid>
							</form>
						</Grid>
						<div style={{ paddingTop: 20 }}></div>
						<Grid container direction="row" justifyContent="flex-end">
							<Button
								onClick={() => {
									setOpenedit(false);
								}}
								color="secondary"
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									editDetails();
								}}
								color="primary"
								autoFocus
							>
								Edit
							</Button>
						</Grid>
					</Box>
				</Fade>
			</Modal>

			<Zoom in timeout={1000}>
				<Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
					<Card sx={style.cardWidth}>
						<CardActionArea>
							{/* <CardMedia component="img" alt="..." height="auto" image={props.image} /> */}
							<Grid pt={`${(200 * 60) / 100}px`} height="200px">
								<Grid height="100%" sx={{ backgroundColor: "darkgrey" }}></Grid>
							</Grid>

							<CardContent>
								<Typography variant="subtitle2" component="h6">
									{props.isPrivate ? "Stored Privately" : "Shared Publicly"}
								</Typography>
								<Typography gutterBottom variant="h5" component="h2">
									{props.title}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{props.caption}
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button
								size="small"
								color="primary"
								onClick={() => {
									setOpenedit(true);
								}}
							>
								Edit
							</Button>
							<Button
								size="small"
								color="secondary"
								onClick={() => {
									setOpen(true);
								}}
							>
								Delete
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Zoom>
		</>
	);
};

export default ImageCard;
