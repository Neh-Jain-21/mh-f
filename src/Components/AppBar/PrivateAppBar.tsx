import React, { useState } from "react";
import { Toolbar, AppBar, IconButton, Menu, Badge, MenuItem, Autocomplete, TextField, Grid, Typography } from "@mui/material";
import { Menu as MenuIcon, EmailOutlined, NotificationsNoneOutlined, AccountCircleOutlined, MoreVertOutlined, ExitToApp, Search } from "@mui/icons-material";
import { useSnackbar } from "notistack";
// STYLE
import { privateAppbarStyle as style } from "src/Components/AppBar/Appbar.style";
import { NavLink } from "react-router-dom";
// API
import Api from "src/Helpers/ApiHandler";
// REDUX
import { useAppDispatch } from "src/Redux/hooks";
import { logout } from "src/Redux/auth/reducer";

interface PrivateAppBarProps {
	handleDrawerChange: () => void;
}

interface MobileMenuProps {
	mobileMoreAnchorEl: (EventTarget & HTMLButtonElement) | null;
	handleMobileMenuClose: () => void;
	handleLogout: () => void;
}

const api = new Api();

/** Appbar of landing page */
const PrivateAppBar = ({ handleDrawerChange }: PrivateAppBarProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
	// const [state, setState] = useState(false);
	// const [users, setUsers] = useState([]);
	// const [searchValue, setSearchValue] = useState("");

	/** Close mobile menu */
	const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

	/** Open mobile menu */
	const handleMobileMenuOpen = (event: React.SyntheticEvent<HTMLButtonElement>) => setMobileMoreAnchorEl(event.currentTarget);

	/** Logout event */
	const handleLogout = async () => {
		try {
			const response = await api.get("/auth/logout");

			dispatch(logout());

			enqueueSnackbar(response.data.message, { variant: "success" });
		} catch (error: any) {
			if (api.isApiError(error)) enqueueSnackbar(error.response?.data?.message || "Something wrong!", { variant: "error" });
			else console.log(error);
		}
	};

	return (
		<>
			<AppBar sx={style.appbar} position="static">
				<Toolbar>
					<IconButton edge="start" sx={style.menuButton} color="inherit" aria-label="open drawer" onClick={handleDrawerChange}>
						<MenuIcon />
					</IconButton>
					<Typography sx={{ width: "140px", display: { xs: "none", sm: "inline-flex" } }}>MediaHost</Typography>

					<div style={{ width: "100%" }}>
						<Autocomplete
							sx={style.search}
							freeSolo
							options={[]}
							renderInput={(params) => (
								<div style={{ display: "flex", flexDirection: "row" }}>
									<TextField {...params} fullWidth /* value={searchValue} onInput={handleSearch} */ placeholder="Search…" sx={style.searchInput} size="small" />
									<IconButton
										size="small"
										// onClick={() => {
										// 	if (searchValue !== "") history.push(`/Profile/${searchValue}`);
										// }}
									>
										<Search />
									</IconButton>
								</div>
							)}
						/>
					</div>

					<Grid width="auto" container display="flex" direction="row" flexWrap="nowrap">
						<IconButton color="inherit" sx={{ mr: 1, display: { xs: "none", md: "inline-flex" } }}>
							<Badge badgeContent={0} color="secondary">
								<EmailOutlined />
							</Badge>
						</IconButton>
						<IconButton color="inherit" sx={{ mr: 1, display: { xs: "none", md: "inline-flex" } }}>
							<Badge badgeContent={0} color="secondary">
								<NotificationsNoneOutlined />
							</Badge>
						</IconButton>
						<IconButton edge="end" sx={{ mr: 0.5, display: { xs: "none", md: "inline-flex" } }} /* onClick={handleProfileMenuOpen} */ color="inherit">
							<AccountCircleOutlined />
						</IconButton>
						<IconButton edge="end" sx={{ mr: 0.5, display: { xs: "inline-flex", md: "none" } }} onClick={handleMobileMenuOpen} color="inherit">
							<MoreVertOutlined />
						</IconButton>
						<IconButton edge="end" sx={{ display: { xs: "none", md: "inline-flex" } }} color="inherit" onClick={handleLogout}>
							<ExitToApp />
						</IconButton>
					</Grid>
				</Toolbar>
			</AppBar>

			<MobileMenu mobileMoreAnchorEl={mobileMoreAnchorEl} handleMobileMenuClose={handleMobileMenuClose} handleLogout={handleLogout} />
		</>
	);
};

const MobileMenu = ({ mobileMoreAnchorEl, handleMobileMenuClose, handleLogout }: MobileMenuProps): JSX.Element => (
	<Menu
		anchorEl={mobileMoreAnchorEl}
		onClose={handleMobileMenuClose}
		open={Boolean(mobileMoreAnchorEl)}
		anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
		transformOrigin={{ vertical: "top", horizontal: "right" }}
	>
		<MenuItem>
			<IconButton color="inherit">
				<Badge badgeContent={0} color="secondary">
					<EmailOutlined />
				</Badge>
			</IconButton>
			<p>Messages</p>
		</MenuItem>
		<MenuItem>
			<IconButton color="inherit">
				<Badge badgeContent={0} color="secondary">
					<NotificationsNoneOutlined />
				</Badge>
			</IconButton>
			<p>Notifications</p>
		</MenuItem>
		<NavLink style={{ textDecoration: "none", color: "black" }} to="/Myprofile">
			<MenuItem>
				<IconButton color="inherit">
					<AccountCircleOutlined />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</NavLink>
		<MenuItem>
			<IconButton color="inherit" onClick={handleLogout}>
				<ExitToApp />
			</IconButton>
			<p>LogOut</p>
		</MenuItem>
	</Menu>
);

export default PrivateAppBar;
