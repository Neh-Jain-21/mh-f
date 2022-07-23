import { Outlet } from "react-router-dom";
// COMPONENTS
import PrivateAppBar from "src/Components/AppBar/PrivateAppBar";

const Layout = () => {
	return (
		<>
			<PrivateAppBar />
			<Outlet />
		</>
	);
};

export default Layout;
