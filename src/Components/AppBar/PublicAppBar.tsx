import { useState, useEffect } from "react";
import { Toolbar, AppBar as Bar, IconButton, Typography, Button } from "@mui/material";
import { Menu } from "@mui/icons-material";
// STYLE
import { publicAppbarStyle as style } from "src/Components/AppBar/Appbar.style";

interface AppBarProps {
	handleDrawerChange: () => void;
	handleNavigateToLogin: () => void;
	handleNavigateToSignup: () => void;
}

/** Appbar of landing page */
const PublicAppBar = ({ handleDrawerChange, handleNavigateToLogin, handleNavigateToSignup }: AppBarProps): JSX.Element => {
	const [appBarStyles, setAppBarStyles] = useState<React.CSSProperties>({ backgroundColor: "transparent", color: "white", boxShadow: "none" });

	useEffect(() => {
		window.addEventListener("scroll", headerColorChange);

		return function cleanup() {
			window.removeEventListener("scroll", headerColorChange);
		};
	}, []);

	/** Changes appbar style on scroll */
	const headerColorChange = (): void => {
		if (window.pageYOffset > 400) {
			setAppBarStyles({ backgroundColor: "white", color: "black" });
		} else {
			setAppBarStyles({ backgroundColor: "transparent", color: "white", boxShadow: "none" });
		}
	};

	return (
		<Bar position="fixed" style={appBarStyles}>
			<Toolbar>
				<IconButton edge="start" sx={style.menuIcon} onClick={handleDrawerChange} color="inherit">
					<Menu />
				</IconButton>
				<Typography variant="h6" sx={style.title}>
					Reactive Templates
				</Typography>
				<Button color="inherit" onClick={handleNavigateToLogin} sx={style.loginBtn}>
					Login
				</Button>
				<Button color="inherit" onClick={handleNavigateToSignup}>
					Signup
				</Button>
			</Toolbar>
		</Bar>
	);
};

export default PublicAppBar;
