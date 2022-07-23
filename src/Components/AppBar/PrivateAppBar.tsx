import { Toolbar, AppBar, IconButton, Typography, Button, Autocomplete, TextField, Badge } from "@mui/material";
import { Menu, Search, EmailOutlined, NotificationsNoneOutlined, AccountCircleOutlined, MoreVertOutlined } from "@mui/icons-material";
// STYLE
import { privateAppbarStyle as style } from "src/Components/AppBar/Appbar.style";

/** Appbar of landing page */
const PrivateAppBar = (): JSX.Element => {
	return (
		<div style={{ flexGrow: 1 }}>
			<AppBar sx={style.appbar} position="static">
				<Toolbar>
					<IconButton edge="start" sx={style.menuButton} color="inherit" aria-label="open drawer" /* onClick={() => setState(true)} */>
						<Menu />
					</IconButton>
					{/* <p className={style.title}>MediaHost</p> */}

					{/* <div style={{ width: "100%" }}>
						<Autocomplete
							className={style.search}
							freeSolo
							options={users.map((user) => user.username)}
							renderInput={(params) => (
								<>
									<div style={{ display: "flex", flexDirection: "row" }}>
										<TextField {...params} value={searchValue} onInput={handleSearch} placeholder="Search…" style={{ root: style.inputRoot, input: style.inputInput }} />
										<IconButton
											size="small"
											onClick={() => {
												if (searchValue !== "") history.push(`/Profile/${searchValue}`);
											}}
										>
											<Search />
										</IconButton>
									</div>
								</>
							)}
						/>
					</div> */}

					<div style={{ flexGrow: 1 }} />
					<div /* className={style.sectionDesktop} */>
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<EmailOutlined />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="secondary">
								<NotificationsNoneOutlined />
							</Badge>
						</IconButton>
						<IconButton edge="end" aria-label="account of current user" /* aria-controls={menuId} */ aria-haspopup="true" /* onClick={handleProfileMenuOpen} */ color="inherit">
							<AccountCircleOutlined />
						</IconButton>
					</div>
					<div /* className={style.sectionMobile} */>
						<IconButton edge="end" aria-label="show more" /* aria-controls={mobileMenuId} */ aria-haspopup="true" /* onClick={handleMobileMenuOpen} */ color="inherit">
							<MoreVertOutlined />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{/* {renderMobileMenu}
			{renderMenu}
			<SwipeableDrawer anchor="left" open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
				{list()}
			</SwipeableDrawer> */}
		</div>
	);
};

export default PrivateAppBar;
