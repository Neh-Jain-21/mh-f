import { SxProps } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	forgotPassCardWrapper: {
		width: { xs: "100%", md: "450px" },
		minWidth: "450px",
		px: { xs: "20px", md: "40px" },
	},
	inputGreen: {
		".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#5FC690",
		},
		".MuiFormLabel-root.Mui-focused": {
			color: "#5FC690",
		},
	},
	resetPasswordButton: {
		backgroundColor: "#5FC690",
		textTransform: "capitalize",
		mt: 5,
		width: { xs: "100%", md: "150px" },
		height: { xs: "unset", md: "30px" },

		"&:hover": {
			backgroundColor: "#5FC690",
		},
	},
	imageWrapper: {
		display: { xs: "none", md: "flex" },
		objectFit: "contain",
	},
};

export default style;
