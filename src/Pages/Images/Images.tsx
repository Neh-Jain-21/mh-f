import React, { useState, useEffect } from "react";
import { Grid, Fab, Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, CardMedia, Card, Divider, TextField, Switch, Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
// ICONS
import { Add, Close } from "@mui/icons-material";
// COMPONENTS
import ImageCard from "src/Components/ImageCard/ImageCard";
import Dropzone from "src/Components/Dropzone/Dropzone";
// STYLE
import style from "src/Pages/Images/Images.style";
// API
import Api from "src/Helpers/ApiHandler";
// TYPES
import { TransitionProps } from "@mui/material/transitions";

const api = new Api();

const Images = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [openImageDialog, setOpenImageDialog] = useState<boolean>(false);
	const [details, setDetails] = useState<{ title: string; caption: string; private: boolean }>({ title: "", caption: "", private: true });
	const [file, setFile] = useState<File | null>(null);
	const [img, setImg] = useState("");
	const [loading, setLoading] = useState<boolean>(true);
	// HIDE IMAGE
	const [hidefileinp, setHidefileinp] = useState(false);
	const [hideimg, setHideimg] = useState(true);
	// IMAGE DATA
	const [images, setImages] = useState<{ imageData: string; title: string; caption: string; isPrivate: boolean }[]>([]);

	useEffect(() => {
		fetchImages();
	}, []); // eslint-disable-line

	const fetchImages = async () => {
		try {
			setLoading(true);
			const response = await api.get("/images");

			setImages(response.data.data?.list || []);
			setLoading(false);
		} catch (error) {
			if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
			else console.log(error);
			setLoading(false);
		}
	};

	/** Opens or closes add image dialog */
	const handleChangeAddImageDialog = () => setOpenImageDialog(!openImageDialog);

	/** Handle change text inputs */
	const handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails({ ...details, [event.target.name]: event.target.value });

	/** Handle switch change */
	const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => setDetails({ ...details, [event.target.name]: event.target.checked });

	/** Sets selected image in state and previews it */
	const handleImageChange = <T extends File>(acceptedFiles: T[]): void => {
		if (acceptedFiles && acceptedFiles[0]) {
			setFile(acceptedFiles[0]);
			setImg(URL.createObjectURL(acceptedFiles[0]));
			setHidefileinp(true);
			setHideimg(false);
		}
	};

	const onUploadProgress = (progressEvent: any) => {
		const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
		console.log(percentCompleted);
	};

	const Upload = async () => {
		try {
			if (details.title === "" || details.caption === "" || !file) {
				enqueueSnackbar("Fill all details", { variant: "warning" });
			} else {
				handleChangeAddImageDialog();
				setImages((prev) => {
					prev.unshift({
						...details,
						isPrivate: details.private,
						imageData: (() => {
							const reader = new FileReader();
							reader.readAsDataURL(file);
							if (typeof reader.result === "string") {
								return reader.result;
							} else {
								return "";
							}
						})(),
					});
					return prev;
				});

				const formData = new FormData();

				formData.append("image", file);
				formData.append("title", details.title);
				formData.append("caption", details.caption);
				formData.append("isPrivate", JSON.stringify(details.private));

				const response = await api.post("/images", { data: formData, onUploadProgress });

				enqueueSnackbar(response.data.message, { variant: "success" });
				setFile(null);
				setDetails({ title: "", caption: "", private: true });
			}
		} catch (error) {
			if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
			else console.log(error);
		}
	};

	return (
		<>
			<Box sx={style.toolbar}></Box>
			<div style={{ margin: "20px" }}>
				{loading ? (
					<Grid container direction="row" alignItems="center" justifyContent="center" height="80vh">
						<CircularProgress />
					</Grid>
				) : (
					<>
						{images.length ? (
							<h1 style={{ userSelect: "none", textAlign: "center" }}>YOUR COLLECTION</h1>
						) : (
							<Grid container direction="row" alignItems="center" justifyContent="center" height="80vh">
								<h1>Looks Empty Here!</h1>
							</Grid>
						)}

						<Grid container direction="row">
							{images.map((image, index) => (
								<ImageCard key={index} image={`data:image;base64,${image.imageData}`} title={image.title} caption={image.caption} isPrivate={image.isPrivate} />
							))}
						</Grid>
						<Fab color="primary" onClick={handleChangeAddImageDialog} sx={style.add}>
							<Add />
						</Fab>
					</>
				)}
			</div>

			{/* Add Image Dialog */}
			<Dialog fullScreen open={openImageDialog} onClose={handleChangeAddImageDialog} TransitionComponent={Transition}>
				<AppBar color="primary" sx={style.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleChangeAddImageDialog}>
							<Close />
						</IconButton>
						<Typography variant="h6" sx={style.title}>
							Upload Image
						</Typography>
						<Button color="inherit" onClick={Upload}>
							Upload
						</Button>
					</Toolbar>
				</AppBar>

				<Dropzone hidden={hidefileinp} onChange={handleImageChange} />

				<Grid container direction="row" justifyContent="center">
					<Card sx={style.card} hidden={hideimg}>
						<CardMedia component="img" height="auto" image={img} title="Contemplative Reptile" />
					</Card>
				</Grid>
				<Divider />
				<form style={{ margin: "20px" }} noValidate autoComplete="off">
					<Grid container direction="column">
						<TextField sx={style.textField} label="Title" variant="filled" name="title" value={details.title} onChange={handleChangeText} disabled={hideimg} />
						<TextField sx={style.textField} label="Caption" variant="filled" name="caption" value={details.caption} onChange={handleChangeText} disabled={hideimg} />
						<Grid container direction="row" alignItems="center" justifyContent="center">
							<h4>Keep Private?</h4>
							<Switch checked={details.private} name="private" onChange={handleChangeSwitch} color="primary" />
						</Grid>
					</Grid>
				</form>
			</Dialog>
		</>
	);
};

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any> }, ref: React.Ref<unknown>) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default Images;
