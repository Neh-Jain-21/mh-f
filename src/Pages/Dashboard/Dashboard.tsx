import { Button, Grid, Slide } from "@mui/material";
import { NavLink } from "react-router-dom";
// import { useSnackbar } from "notistack";
// STYLES
import style from "src/Pages/Dashboard/Dashboard.style";

const Dashboard = () => {
	// const { enqueueSnackbar } = useSnackbar();

	// async function getVisit() {
	// 	const res = await fetch(`http://${Config.port}:5000/firstVisit`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			id: cookies.get("userId"),
	// 		}),
	// 	});

	// 	const data = await res.json();

	// 	if (data.first_visit) {
	// 		history.push("/editProfile");
	// 		enqueueSnackbar("Let's build your profile", { variant: "info" });
	// 	}
	// }

	// getVisit();

	return (
		<>
			<Grid sx={style.toolbar}></Grid>
			<Grid sx={style.background} className="fade_in">
				<Grid sx={style.root}>
					<Slide direction="left" in timeout={1000}>
						<h1 className="main__heading">WELCOME</h1>
					</Slide>
					<Slide direction="left" in timeout={2000}>
						<h3 style={{ userSelect: "none", textTransform: "uppercase", marginTop: 0 }}>All your followups will appear here.</h3>
					</Slide>
					<Slide direction="left" in timeout={2000}>
						<Grid>
							<NavLink to="/images" style={{ textDecoration: "none", color: "white" }}>
								<Button style={{ marginRight: 20 }} variant="outlined" color="inherit">
									Upload Image
								</Button>
							</NavLink>
							<NavLink to="/videos" style={{ textDecoration: "none", color: "white" }}>
								<Button variant="outlined" color="inherit">
									Upload Video
								</Button>
							</NavLink>
						</Grid>
					</Slide>
				</Grid>
			</Grid>
		</>
	);
};

export default Dashboard;
