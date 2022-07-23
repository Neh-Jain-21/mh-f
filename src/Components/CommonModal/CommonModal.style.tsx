import { SxProps, Theme } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	modalStyle: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContainer: {
		width: "90vw",
		maxWidth: 400,
		border: "2px solid #000",
		boxShadow: (theme: Theme) => theme.shadows[5],
		padding: (theme: Theme) => theme.spacing(1, 3, 1),
		bgcolor: (theme: Theme) => theme.palette.background.paper,
	},
};

export default style;
