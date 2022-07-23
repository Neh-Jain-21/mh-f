import { IconButton, Drawer, ListItem, ListItemText, Grid, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

interface MainDrawerProps {
	drawerData: {
		key: string;
		onClick: () => void;
	}[];
	openDrawer: boolean;
	handleDrawerChange: () => void;
}

/** Landing page drawer */
const PublicDrawer = ({ drawerData, openDrawer, handleDrawerChange }: MainDrawerProps): JSX.Element => (
	<Drawer anchor="left" open={openDrawer} onClose={handleDrawerChange}>
		<Paper role="presentation" onKeyDown={handleDrawerChange} sx={{ width: "100vw", backdropFilter: "opacity(50%)" }}>
			<IconButton edge="start" color="inherit" onClick={handleDrawerChange} sx={{ mt: "2.5vh", ml: (theme) => theme.spacing(2) }}>
				<Close />
			</IconButton>
			<Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: "92vh" }}>
				{drawerData.map((data) => (
					<ListItem button key={data.key} onClick={data.onClick} sx={{ textAlign: "center", maxWidth: 411 }}>
						<ListItemText primary={data.key} />
					</ListItem>
				))}
			</Grid>
		</Paper>
	</Drawer>
);

export default PublicDrawer;
