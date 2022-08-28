import { useState } from "react";
import { Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
// COMPONENTS
import PublicAppBar from "src/Components/AppBar/PublicAppBar";
import PublicDrawer from "src/Components/Drawer/PublicDrawer";
import SendVerifyEmailModal from "src/Pages/Landing/Modal/SendVerifyEmailModal";
// STYLES
import style from "src/Pages/Landing/Landing.style";
// ICONS
import { ArrowRightAlt, AccountCircle, FileDownload, Inventory } from "@mui/icons-material";
// HELPERS
import { paperUi } from "src/Helpers/Constants";

const ImageComp = ({ img }: { img: string }): JSX.Element => (
	<Grid item xs={12} sm={6} container direction="column" alignItems="center">
		<img style={{ minWidth: 100, borderRadius: "10px", maxWidth: "80%" }} src={img} alt="UI" />
	</Grid>
);

const TextComp = ({ title, desc_one, desc_two }: { title: string; desc_one: string; desc_two: string }): JSX.Element => (
	<Grid item sm={6} xs={12} container textAlign="center" direction="column" alignItems="center" justifyContent="center" paddingX={1}>
		<h1>{title}</h1>
		<h3>
			{desc_one}
			<br />
			{desc_two}
		</h3>
	</Grid>
);

const Landing = (): JSX.Element => {
	const navigate = useNavigate();

	const [openDrawer, setOpenDrawer] = useState<boolean>(false);

	/** Opens or closes drawer */
	const handleDrawerChange = (): void => setOpenDrawer(!openDrawer);

	/** Navigates to login screen */
	const handleNavigateToLogin = (): void => navigate("/login");

	/** Navigates to signup screen */
	const handleNavigateToSignup = (): void => navigate("/signup");

	const drawerData = [
		{
			key: "Login",
			onClick: () => {
				handleDrawerChange();
				setTimeout(handleNavigateToLogin, 500);
			},
		},
		{
			key: "Signup",
			onClick: () => {
				handleDrawerChange();
				setTimeout(handleNavigateToSignup, 500);
			},
		},
		{
			key: "Pricing",
			onClick: handleDrawerChange,
		},
		{
			key: "Developers",
			onClick: handleDrawerChange,
		},
	];

	return (
		<>
			{/* Appbar */}
			<PublicAppBar handleDrawerChange={handleDrawerChange} handleNavigateToLogin={handleNavigateToLogin} handleNavigateToSignup={handleNavigateToSignup} />

			{/* Drawer */}
			<PublicDrawer drawerData={drawerData} openDrawer={openDrawer} handleDrawerChange={handleDrawerChange} />

			<div style={{ backgroundColor: "whitesmoke" }}>
				<div className="landingImage">
					<Grid container direction="column" alignItems="center" justifyContent="center" sx={style.heroSection}>
						<Typography sx={style.heroSectionTitle} color="white" textAlign="center" component="h1">
							Best Reactive Templates Just For You
						</Typography>
						<Typography mx="10vw" color="white" textAlign="center" component="h4">
							We provide prebuilt web templates for your next app, Join us now.
						</Typography>
						<Grid mt={5}>
							<Button color="error" variant="contained" onClick={handleNavigateToSignup}>
								Join Us
							</Button>
							<Typography mx="10px" my="auto" color="white" textAlign="center" component="span">
								OR
							</Typography>
							<Button color="primary" variant="contained" endIcon={<ArrowRightAlt />}>
								Explore
							</Button>
						</Grid>
					</Grid>
				</div>

				<Grid container justifyContent="center" alignItems="center">
					<Paper elevation={3} className="paper__pa">
						{paperUi.map((value) => (
							<Grid key={value.key} container sx={style.imagesSectionGrid} direction={value.reversed ? "row-reverse" : "row"}>
								<ImageComp {...value} />
								<TextComp {...value} />
							</Grid>
						))}
					</Paper>
				</Grid>

				<Grid container direction="column" justifyContent="center" alignItems="center" sx={style.footerSection}>
					<h1>Reactive Templates</h1>

					<Grid container direction="row" mt={4} justifyContent="center" alignItems="center">
						<Grid item xs={6} md={4} lg={2} mb={5} container direction="column" justifyContent="center" alignItems="center">
							<AccountCircle sx={{ fontSize: 60, mb: 2 }} />
							<Typography color="white" textAlign="center" component="h4" variant="h4">
								0
							</Typography>
							<Typography color="white" textAlign="center" component="h5" variant="h5">
								Accounts
							</Typography>
						</Grid>
						<Grid item xs={6} md={4} lg={2} mb={5} container direction="column" justifyContent="center" alignItems="center">
							<FileDownload sx={{ fontSize: 60, mb: 2 }} />
							<Typography color="white" textAlign="center" component="h4" variant="h4">
								0
							</Typography>
							<Typography color="white" textAlign="center" component="h5" variant="h5">
								Downloads
							</Typography>
						</Grid>
						<Grid item xs={12} md={4} lg={2} mb={5} container direction="column" justifyContent="center" alignItems="center">
							<Inventory sx={{ fontSize: 60, mb: 2 }} />
							<Typography color="white" textAlign="center" component="h4" variant="h4">
								0
							</Typography>
							<Typography color="white" textAlign="center" component="h5" variant="h5">
								Products
							</Typography>
						</Grid>
					</Grid>

					<h4 style={{ textAlign: "center", marginTop: 30 }}>© {new Date().getFullYear()} Reactive Templates, all rights reserved.</h4>
				</Grid>
			</div>

			{/* Verify Email Modal */}
			{/* {openSendVerifyEmailModal && <SendVerifyEmailModal openSendVerifyEmailModal={openSendVerifyEmailModal} handleSendVerifyEmailModal={handleSendVerifyEmailModal} />} */}
		</>
	);
};

export default Landing;
