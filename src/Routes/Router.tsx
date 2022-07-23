import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { useSnackbar } from "notistack";
// COMPONENTS
import LazyLoad from "src/Components/Lazyload/LazyLoad";
// ROUTES
import { privateRoutes, publicRoutes } from "src/Routes/Routes";
// API
import Api from "src/Helpers/ApiHandler";
// REDUX
import { useAppSelector } from "src/Redux/hooks";

const api = new Api();

const Router = (): JSX.Element => {
	const { enqueueSnackbar } = useSnackbar();

	let routes = publicRoutes;
	const loggedIn: boolean = useAppSelector((state) => state.Auth.loggedIn) !== null;

	if (loggedIn) routes = privateRoutes;

	const routing = useRoutes(routes);

	useEffect(() => {
		checkServerOffline();
	}, []);

	const checkServerOffline = async () => {
		try {
			await api.get("/");
		} catch (error: any) {
			enqueueSnackbar("Server offline😭", { variant: "error" });
		}
	};

	return <Suspense fallback={<LazyLoad />}>{routing}</Suspense>;
};

export default Router;
