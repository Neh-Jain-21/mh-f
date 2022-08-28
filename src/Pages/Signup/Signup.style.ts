import { SxProps } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	signupCardWrapper: {
		width: { xs: "100%", md: "450px" },
		minWidth: "450px",
		px: { xs: "20px", md: "40px" },
	},
	signupButton: {
		backgroundColor: "#77536F",
		textTransform: "capitalize",
		width: { xs: "100%", md: "100px" },
		height: { xs: "unset", md: "30px" },

		"&:hover": {
			backgroundColor: "#77536F",
		},
	},
	imageWrapper: {
		display: { xs: "none", md: "flex" },
		objectFit: "contain",
	},
};

export default style;
