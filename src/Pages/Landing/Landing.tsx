import { useState } from "react";
import { Typography, Button, Grid, Paper } from "@mui/material";
// COMPONENTS
import PublicAppBar from "src/Components/AppBar/PublicAppBar";
import PublicDrawer from "src/Components/Drawer/PublicDrawer";
import LoginModal from "src/Pages/Landing/Modal/LoginModal";
import SignupModal from "src/Pages/Landing/Modal/SignUpModal";
import ForgotModal from "src/Pages/Landing/Modal/ForgotModal";
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
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);
	const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
	const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
	const [openForgotModal, setOpenForgotModal] = useState<boolean>(false);
	const [openSendVerifyEmailModal, setOpenSendVerifyEmailModal] = useState<boolean>(false);

	/** Opens or closes drawer */
	const handleDrawerChange = (): void => setOpenDrawer(!openDrawer);

	/** Opens or closes login modal */
	const handleLoginModal = (): void => setOpenLoginModal(!openLoginModal);

	/** Opens or closes signup modal */
	const handleSignupModal = (): void => setOpenSignupModal(!openSignupModal);

	/** Opens or closes forgot password modal */
	const handleForgotModal = (): void => setOpenForgotModal(!openForgotModal);

	/** Opens or closes verify email modal */
	const handleSendVerifyEmailModal = (): void => setOpenSendVerifyEmailModal(!openSendVerifyEmailModal);

	const drawerData = [
		{
			key: "Login",
			onClick: () => {
				handleDrawerChange();
				setTimeout(handleLoginModal, 500);
			},
		},
		{
			key: "Signup",
			onClick: () => {
				handleDrawerChange();
				setTimeout(handleSignupModal, 500);
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
			<PublicAppBar handleDrawerChange={handleDrawerChange} handleLoginModal={handleLoginModal} handleSignupModal={handleSignupModal} />

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
							<Button color="error" variant="contained" onClick={handleSignupModal}>
								Join Us
							</Button>
							<Typography mx="10px" my="auto" color="white" textAlign="center" component="span">
								OR
							</Typography>
							<Button color="primary" variant="contained" endIcon={<ArrowRightAlt />} onClick={handleSignupModal}>
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
						<Grid item xs={12} sm={6} md={4} lg={2} mb={5} container direction="column" justifyContent="center" alignItems="center">
							<AccountCircle sx={{ fontSize: 60, mb: 2 }} />
							<Typography color="white" textAlign="center" component="h4" variant="h4">
								0
							</Typography>
							<Typography color="white" textAlign="center" component="h5" variant="h5">
								Accounts
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={2} mb={5} container direction="column" justifyContent="center" alignItems="center">
							<FileDownload sx={{ fontSize: 60, mb: 2 }} />
							<Typography color="white" textAlign="center" component="h4" variant="h4">
								0
							</Typography>
							<Typography color="white" textAlign="center" component="h5" variant="h5">
								Downloads
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={4} lg={2} mb={5} container direction="column" justifyContent="center" alignItems="center">
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

			{/* Login Modal */}
			{openLoginModal && (
				<LoginModal
					openLoginModal={openLoginModal}
					handleLoginModal={handleLoginModal}
					handleSignupModal={handleSignupModal}
					handleForgotModal={handleForgotModal}
					handleSendVerifyEmailModal={handleSendVerifyEmailModal}
				/>
			)}

			{/* signup Modal */}
			{openSignupModal && <SignupModal openSignupModal={openSignupModal} handleLoginModal={handleLoginModal} handleSignupModal={handleSignupModal} />}

			{/* Forgot Modal */}
			{openForgotModal && <ForgotModal openForgotModal={openForgotModal} handleForgotModal={handleForgotModal} />}

			{/* Verify Email Modal */}
			{openSendVerifyEmailModal && <SendVerifyEmailModal openSendVerifyEmailModal={openSendVerifyEmailModal} handleSendVerifyEmailModal={handleSendVerifyEmailModal} />}
		</>
	);
};

export default Landing;
