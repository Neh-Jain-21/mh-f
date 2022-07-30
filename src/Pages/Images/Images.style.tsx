import { SxProps, Theme } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	appBar: {
		position: "relative",
	},
	title: {
		ml: (theme: Theme) => theme.spacing(2),
		flex: 1,
	},
	root: {
		margin: 20,
	},
	toolbar: (theme: Theme) => theme.mixins.toolbar,
	nav: {
		textDecoration: "none",
		color: "white",
	},
	cardWidth: {
		marginTop: 20,
		marginRight: { xs: 20, sm: 0 },
	},
	add: {
		position: "fixed",
		bottom: 10,
		right: 10,
	},
	container: {
		margin: 20,
	},
	card: {
		width: "90%",
		maxWidth: 500,
		objectFit: "contain",
		my: 30,
	},
	textField: {
		mb: "20px",
	},
};

export default style;
