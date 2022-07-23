import { SxProps } from "@mui/material";

type Style = {
	[key: string]: SxProps | {};
};

const style: Style = {
	heroSection: {
		height: 500,
	},
	heroSectionTitle: {
		userSelect: "none",
		fontSize: { xs: 30, md: 50 },
	},
	heroSectionJoinText: {
		mt: 5,
	},
	imagesSectionGrid: {
		mt: "10vh",
	},
	footerSection: {
		backgroundColor: "#132340",
		color: "white",
		pt: 12,
	},
	footerSectionButton: {
		mt: 2,
	},
};

export default style;
