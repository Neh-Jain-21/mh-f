import React, { useState, useMemo, useEffect } from "react";
import { Grid, makeStyles, Fab, Dialog, AppBar, Toolbar, IconButton, Typography, Button, Slide, CardMedia, Card, Divider, TextField, Switch, Box } from "@mui/material";
// import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
// ICONS
import { Add, Close } from "@mui/icons-material";
// COMPONENTS
import ImageCard from "src/Components/ImageCard/ImageCard";
// STYLE
import style from "src/Pages/Images/Images.style";
// API
import Api from "src/Helpers/ApiHandler";

// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

const api = new Api();

const Images = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [openAdd, setOpenAdd] = useState(false);
	//details
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");
	const [publicPost, setPublicPost] = useState(true);
	// photo state
	const [file, setFile] = useState("");
	const [img, setImg] = useState("");
	//hide state
	const [hidefileinp, setHidefileinp] = useState(false);
	const [hideimg, setHideimg] = useState(true);
	//getIamges
	const [images, setImages] = useState<{ path: string; image: string; title: string; caption: string; isPrivate: boolean }[]>([]);

	// const loadFile = (event) => {
	// 	//preview image
	// 	if (event.target.files[0] !== undefined) {
	// 		setFile(event.target.files[0]);
	// 		setImg(URL.createObjectURL(event.target.files[0]));
	// 		setHidefileinp(true);
	// 		setHideimg(false);
	// 	}
	// };

	useEffect(() => {
		fetchImages();
	}, [file]);

	const fetchImages = async () => {
		try {
			const response = await api.get("/images");

			setImages(response.data.data?.images || []);
		} catch (error) {
			if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
			else console.log(error);
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

	//Dropzone
	// function Dropzone() {
	// 	const classes = useStyles();

	// 	const baseStyle = {
	// 		flex: 1,
	// 		display: "flex",
	// 		flexDirection: "column",
	// 		alignItems: "center",
	// 		userSelect: "none",
	// 		justifyContent: "center",
	// 		padding: "20px",
	// 		borderWidth: 2,
	// 		borderRadius: 2,
	// 		borderColor: "#eeeeee",
	// 		borderStyle: "dashed",
	// 		backgroundColor: "#fafafa",
	// 		color: "#bdbdbd",
	// 		outline: "none",
	// 		transition: "border .24s ease-in-out",
	// 	};

	// 	const activeStyle = {
	// 		borderColor: "#2196f3",
	// 	};

	// 	const acceptStyle = {
	// 		borderColor: "#00e676",
	// 	};

	// 	const rejectStyle = {
	// 		borderColor: "#ff1744",
	// 	};

	// 	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
	// 		accept: "image/jpeg, image/png",
	// 	});

	// 	const style = useMemo(
	// 		() => ({
	// 			...baseStyle,
	// 			...(isDragActive ? activeStyle : {}),
	// 			...(isDragAccept ? acceptStyle : {}),
	// 			...(isDragReject ? rejectStyle : {}),
	// 		}),
	// 		[isDragActive, isDragReject, isDragAccept]
	// 	);

	// 	return (
	// 		<div className={classes.container} hidden={hidefileinp}>
	// 			<div {...getRootProps({ style })}>
	// 				<input {...getInputProps()} onChange={loadFile} />
	// 				<p>Drag 'n' drop some files here, or click to select files</p>
	// 				<em>(Only *.jpeg and *.png images will be accepted)</em>
	// 			</div>
	// 		</div>
	// 	);
	// }

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
				<Fab color="secondary" onClick={() => setOpenAdd(true)} sx={style.add}>
					<Add />
				</Fab>
			</div>

			{/* Add Image Dialog */}
			{/* <Dialog fullScreen open={openAdd} onClose={() => setOpenAdd(false)} TransitionComponent={Transition}>
				<AppBar color="secondary" className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => {
								setOpenAdd(false);
							}}
							aria-label="close"
						>
							<Close />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Upload Image
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={() => {
								Upload();
							}}
						>
							Upload
						</Button>
					</Toolbar>
				</AppBar>

				<Dropzone />

				<Grid container direction="row" justifyContent="center">
					<Card className={classes.card} hidden={hideimg}>
						<CardMedia
							component="img"
							// height="140"
							height="auto"
							image={img}
							title="Contemplative Reptile"
						/>
					</Card>
				</Grid>
				<Divider />
				<form className={classes.root} noValidate autoComplete="off">
					<Grid container direction="column">
						<TextField
							label="Title"
							variant="filled"
							value={title}
							onChange={(event) => {
								setTitle(event.target.value);
							}}
							disabled={hideimg}
						/>
						<div style={{ paddingTop: 20 }}></div>
						<TextField
							label="Caption"
							variant="filled"
							value={caption}
							onChange={(event) => {
								setCaption(event.target.value);
							}}
							disabled={hideimg}
						/>
						<div style={{ paddingTop: 20 }}></div>
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
					</Grid>
				</form>
			</Dialog> */}
		</>
	);
};

export default Images;
