import React, { useState, useEffect } from "react";
import { Grid, Fab, Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, CardMedia, Card, Divider, TextField, Switch, Box } from "@mui/material";
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
	// photo state
	const [file, setFile] = useState<File | null>(null);
	const [img, setImg] = useState("");
	//hide state
	const [hidefileinp, setHidefileinp] = useState(false);
	const [hideimg, setHideimg] = useState(true);
	//getIamges
	const [images, setImages] = useState<{ path: string; image: string; title: string; caption: string; isPrivate: boolean }[]>([]);

	useEffect(() => {
		fetchImages();
	}, [file]); // eslint-disable-line

	const fetchImages = async () => {
		try {
			const response = await api.get("/images");

			setImages(response.data.data?.images || []);
		} catch (error) {
			if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
			else console.log(error);
		}
	};

	/** Opens or closes add image dialog */
	const handleChangeAddImageDialog = () => setOpenImageDialog(!openImageDialog);

	/** Handle change text inputs */
	const handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails({ ...details, [event.target.name]: event.target.value });

	/** Handle switch change */
	const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => setDetails({ ...details, [event.target.name]: event.target.checked });

	/** Sets selected image in state and previews it */
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files && event.target.files[0]) {
			setFile(event.target.files[0]);
			setImg(URL.createObjectURL(event.target.files[0]));
			setHidefileinp(true);
			setHideimg(false);
		}
	};

	// const Upload = async () => {
	// 	if (title === "" || img === "" || caption === "") {
	// 		enqueueSnackbar("Fill All Details", { variant: "warning" });
	// 	} else {
	// 		const formData = new FormData();
	// 		formData.append("userid", cookies.get("userId"));
	// 		formData.append("image", file);
	// 		formData.append("title", title);
	// 		formData.append("caption", caption);
	// 		formData.append("isPrivate", publicPost);

	// 		const res = await axios.post(`http://${Config.port}:5000/Uploadimage`, formData);

	// 		enqueueSnackbar(res.data.msg, { variant: "success" });
	// 		setOpenAdd(false);
	// 		setFile("");
	// 	}
	// };

	return (
		<>
			<Box sx={style.toolbar}></Box>
			<div style={{ margin: "20px" }}>
				{images.length ? (
					<h1 style={{ userSelect: "none", textAlign: "center" }}>YOUR COLLECTION</h1>
				) : (
					<div style={{ userSelect: "none", display: "flex", height: "80vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
						<h1 style={{ textAlign: "center" }}>Looks Empty Here!</h1>
					</div>
				)}

				<Grid container direction="row">
					{images.map((image, index) => (
						<ImageCard key={index} path={image.path} image={`data:image;base64,${image.image}`} title={image.title} caption={image.caption} isPrivate={image.isPrivate} />
					))}
				</Grid>
				<Fab color="primary" onClick={handleChangeAddImageDialog} sx={style.add}>
					<Add />
				</Fab>
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
						<Button color="inherit" /* onClick={Upload} */>Upload</Button>
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
