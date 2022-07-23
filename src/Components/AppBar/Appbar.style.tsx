import { SxProps, Theme } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

export const publicAppbarStyle: Style = {
	menuIcon: {
		mr: (theme: Theme) => theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	loginBtn: {
		mr: 2,
	},
};

export const privateAppbarStyle: Style = {
	appbar: {
		position: "fixed",
		backgroundColor: "white",
		color: "black",
	},
	menuButton: {
		mr: (theme: Theme) => theme.spacing(2),
	},
	loginBtn: {
		mr: 2,
	},
};
