import { useState, useEffect } from "react";
import { Toolbar, AppBar as Bar, IconButton, Typography, Button } from "@mui/material";
import { Menu } from "@mui/icons-material";

interface AppBarProps {
	handleDrawerChange: () => void;
	handleLoginModal: () => void;
	handleSignupModal: () => void;
}

const AppBar = ({ handleDrawerChange, handleLoginModal, handleSignupModal }: AppBarProps) => {
	const [appBarStyles, setAppBarStyles] = useState<React.CSSProperties>({ backgroundColor: "transparent", color: "white", boxShadow: "none" });

	useEffect(() => {
		window.addEventListener("scroll", headerColorChange);

		return function cleanup() {
			window.removeEventListener("scroll", headerColorChange);
		};
	}, []);

	const headerColorChange = () => {
		if (window.pageYOffset > 400) {
			setAppBarStyles({ backgroundColor: "white", color: "black" });
		} else {
			setAppBarStyles({ backgroundColor: "transparent", color: "white", boxShadow: "none" });
		}
	};

	return (
		<Bar position="fixed" style={appBarStyles}>
			<Toolbar>
				<IconButton edge="start" sx={{ mr: (theme) => theme.spacing(2) }} onClick={handleDrawerChange} color="inherit">
					<Menu />
				</IconButton>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					MediaHost
				</Typography>
				<Button color="inherit" onClick={handleLoginModal} sx={{ mr: 2 }}>
					Login
				</Button>
				<Button color="inherit" onClick={handleSignupModal}>
					Signup
				</Button>
			</Toolbar>
		</Bar>
	);
};

export default AppBar;
