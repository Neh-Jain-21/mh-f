import { SxProps, Theme } from "@mui/material";
// IMAGES
import DashboardImage from "src/Assets/dashboard/dashboard.jpeg";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginTop: 0,
		paddingLeft: "20px",
		paddingRight: "20px",
		height: { xs: "calc(100vh - 56px)", md: "calc(100vh - 64px)" },
		alignItems: { xs: "center", md: "flex-end" },
		color: "white",
		textAlign: "center",
	},
	toolbar: (theme: Theme) => theme.mixins.toolbar,
	background: {
		backgroundColor: "#FBD804",
		// paddingTop: { md: 11, xl: 15 },
		position: "absolute",
		backgroundImage: `url(${DashboardImage})`,
		backgroundSize: "cover",
		backgroundPosition: "center right",
		width: "100vw",
	},
};

export default style;
