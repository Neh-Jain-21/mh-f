import { SxProps, Theme } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	root: {
		margin: 20,
	},
	toolbar: (theme: Theme) => theme.mixins.toolbar,
	nav: {
		textDecoration: "none",
		color: "white",
	},
	cardWidth: {
		marginTop: "20px",
		marginRight: { xs: 0, sm: 0 },
	},
	add: {
		position: "fixed",
		bottom: 10,
		right: 10,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: (theme: Theme) => theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: (theme: Theme) => theme.shadows[5],
		padding: (theme: Theme) => theme.spacing(1, 4, 1),
		width: "80vw",
		maxWidth: 400,
	},
};

export default style;
