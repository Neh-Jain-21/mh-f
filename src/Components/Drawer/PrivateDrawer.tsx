import { NavLink } from "react-router-dom";
import { ListItem, ListItemText, Grid, SwipeableDrawer, List, Divider, ListItemIcon } from "@mui/material";
import { HomeOutlined, ImageOutlined, VideocamOutlined, CodeOutlined, SettingsInputComponentOutlined } from "@mui/icons-material";
// REDUX
import { useAppSelector } from "src/Redux/hooks";

interface MainDrawerProps {
	drawerOpen: boolean;
	handleDrawerChange: () => void;
}

/** Landing page drawer */
const PrivateDrawer = ({ drawerOpen, handleDrawerChange }: MainDrawerProps): JSX.Element => {
	const name = useAppSelector((state) => state.Auth.name);

	return (
		<SwipeableDrawer anchor="left" open={drawerOpen} onClose={handleDrawerChange} onOpen={handleDrawerChange}>
			<div style={{ width: "250px" }} role="presentation" onClick={handleDrawerChange} onKeyDown={handleDrawerChange}>
				<Grid container flexGrow={1} direction="row" justifyContent="center">
					<h3>Welcome {name}</h3>
				</Grid>

				<Divider />

				<List>
					<NavLink style={{ textDecoration: "none", color: "black" }} to="/dashboard">
						<ListItem button key="Home">
							<ListItemIcon>
								<HomeOutlined />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItem>
					</NavLink>
					<NavLink style={{ textDecoration: "none", color: "black" }} to="/images">
						<ListItem button key="Your Images">
							<ListItemIcon>
								<ImageOutlined />
							</ListItemIcon>
							<ListItemText primary="Your Images" />
						</ListItem>
					</NavLink>
					<NavLink style={{ textDecoration: "none", color: "black" }} to="/videos">
						<ListItem button key="Your Videos">
							<ListItemIcon>
								<VideocamOutlined />
							</ListItemIcon>
							<ListItemText primary="Your Videos" />
						</ListItem>
					</NavLink>
				</List>
				<Divider />
				<List>
					<ListItem button key="For Developers">
						<ListItemIcon>
							<CodeOutlined />
						</ListItemIcon>
						<ListItemText primary="For Developers" />
					</ListItem>
					<NavLink style={{ textDecoration: "none", color: "black" }} to="/api">
						<ListItem button key="API">
							<ListItemIcon>
								<SettingsInputComponentOutlined />
							</ListItemIcon>
							<ListItemText primary="API" />
						</ListItem>
					</NavLink>
				</List>
			</div>
		</SwipeableDrawer>
	);
};

export default PrivateDrawer;
