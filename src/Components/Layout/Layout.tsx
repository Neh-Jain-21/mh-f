import { useState } from "react";
import { Outlet } from "react-router-dom";
// COMPONENTS
import PrivateAppBar from "src/Components/AppBar/PrivateAppBar";
import PrivateDrawer from "src/Components/Drawer/PrivateDrawer";

const Layout = () => {
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

	/** Opens or closes drawer */
	const handleDrawerChange = () => setDrawerOpen(!drawerOpen);

	return (
		<>
			<PrivateAppBar handleDrawerChange={handleDrawerChange} />
			<PrivateDrawer drawerOpen={drawerOpen} handleDrawerChange={handleDrawerChange} />
			<Outlet />
		</>
	);
};

export default Layout;
