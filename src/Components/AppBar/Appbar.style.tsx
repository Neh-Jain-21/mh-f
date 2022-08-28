import { SxProps, Theme } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

export const publicAppbarStyle: Style = {
	menuIcon: {
		mr: (theme: Theme) => ({ xs: theme.spacing(0), sm: theme.spacing(2) }),
	},
	title: {
		flexGrow: 1,
		fontSize: { xs: "1rem", sm: "1.25rem" },
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
	search: {
		position: "relative",
		borderRadius: (theme: Theme) => theme.shape.borderRadius,
		width: { xs: "100%", md: "25ch" },
		ml: { xs: "none", md: "auto" },
		mr: 1,
	},
	searchInput: {
		color: "inherit",
		padding: (theme: Theme) => theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${(theme: Theme) => theme.spacing(4)}px)`,
		transition: (theme: Theme) => theme.transitions.create("width"),
	},
};
