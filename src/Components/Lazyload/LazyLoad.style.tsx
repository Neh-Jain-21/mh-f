import { SxProps, Theme } from "@mui/material";

type Style = {
	backdrop: SxProps | {};
};

const style: Style = {
	backdrop: {
		color: "#fff",
		zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
	},
};

export default style;
