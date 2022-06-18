import { useState } from "react";
import { Typography, Button, Grid, Paper } from "@mui/material";
// COMPONENTS
import AppBar from "src/Components/AppBar/AppBar";
import MainDrawer from "src/Components/Drawer/Drawer";
import LoginModal from "src/Pages/Landing/Modal/LoginModal";
import SignupModal from "src/Pages/Landing/Modal/SignUpModal";
import ForgotModal from "src/Pages/Landing/Modal/ForgotModal";
// HELPERS
import { paperUi } from "src/Helpers/Constants";

const ImageComp = ({ img }: { img: string }) => (
	<Grid item xs={12} sm={6} container direction="column" alignItems="center">
		<img style={{ minWidth: 100, borderRadius: "10px", maxWidth: "80%" }} src={img} alt="UI" />
	</Grid>
);

const TextComp = ({ title, desc_one, desc_two }: { title: string; desc_one: string; desc_two: string }) => (
	<Grid item sm={6} xs={12} container textAlign="center" direction="column" alignItems="center" justifyContent="center">
		<h1>{title}</h1>
		<h3>
			{desc_one}
			<br />
			{desc_two}
		</h3>
	</Grid>
);

const Landing = () => {
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);
	const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
	const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
	const [openForgotModal, setOpenForgotModal] = useState<boolean>(false);

	const handleDrawerChange = () => setOpenDrawer(!openDrawer);

	const handleLoginModal = () => setOpenLoginModal(!openLoginModal);

	const handleSignupModal = () => setOpenSignupModal(!openSignupModal);

	const handleForgotModal = () => setOpenForgotModal(!openForgotModal);

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
			<AppBar handleDrawerChange={handleDrawerChange} handleLoginModal={handleLoginModal} handleSignupModal={handleSignupModal} />

			{/* Drawer */}
			<MainDrawer drawerData={drawerData} openDrawer={openDrawer} handleDrawerChange={handleDrawerChange} />

			<div style={{ backgroundColor: "whitesmoke" }}>
				<div className="landingImage">
					<Grid container direction="column" alignItems="center" justifyContent="center" sx={{ height: 500 }}>
						<Typography sx={{ userSelect: "none", fontSize: { xs: 30, md: 50 } }} color="white" textAlign="center" component="h1">
							Easy Media Hosting For Your Apps
						</Typography>
						<Typography mx="10vw" color="white" textAlign="center" component="h4">
							We provide best media hosting solutions for you next app, Join us now.
						</Typography>
						<Button sx={{ mt: 5 }} color="error" variant="contained" onClick={handleSignupModal}>
							Join Us
						</Button>
					</Grid>
				</div>

				<Grid container justifyContent="center" alignItems="center">
					<Paper elevation={3} className="paper__pa">
						{paperUi.map((value) => (
							<Grid key={value.key} container sx={{ mt: "10vh" }}>
								{value.reversed ? (
									<>
										<TextComp {...value} />
										<ImageComp {...value} />
									</>
								) : (
									<>
										<ImageComp {...value} />
										<TextComp {...value} />
									</>
								)}
							</Grid>
						))}
					</Paper>
				</Grid>

				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
					sx={{ backgroundColor: "#132340", color: "white", pt: 12 }}
				>
					<h1>MediaHost</h1>
					<Button sx={{ mt: 2 }} size="large" color="secondary" variant="contained">
						Explore Prices
					</Button>
					<h4 style={{ textAlign: "center", marginTop: 30 }}>
						© 2022 MediaHost.com, Inc. All rights reserved.
						<br />
						Built using React JS and Node JS
					</h4>
				</Grid>
			</div>

			{/* Login Modal */}
			{openLoginModal && (
				<LoginModal
					openLoginModal={openLoginModal}
					handleLoginModal={handleLoginModal}
					handleSignupModal={handleSignupModal}
					handleForgotModal={handleForgotModal}
				/>
			)}

			{/* signup Modal */}
			{openSignupModal && (
				<SignupModal openSignupModal={openSignupModal} handleLoginModal={handleLoginModal} handleSignupModal={handleSignupModal} />
			)}

			{/* Forgot Modal */}
			{openForgotModal && <ForgotModal openForgotModal={openForgotModal} handleForgotModal={handleForgotModal} />}
		</>
	);
};

export default Landing;
