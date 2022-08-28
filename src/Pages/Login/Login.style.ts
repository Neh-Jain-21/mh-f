import { SxProps } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	loginCardWrapper: {
		width: { xs: "100%", md: "450px" },
		minWidth: "450px",
		px: { xs: "20px", md: "40px" },
	},
	loginButton: {
		textTransform: "capitalize",
		width: { xs: "100%", md: "100px" },
		height: { xs: "unset", md: "30px" },
	},
	imageWrapper: {
		display: { xs: "none", md: "flex" },
		objectFit: "contain",
	},
};

export default style;
