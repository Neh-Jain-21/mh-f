import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { reducerTypes } from "src/Redux/reducers";
import { useSnackbar } from "notistack";
// COMPONENTS
import LazyLoad from "src/Components/Lazyload/LazyLoad";
// ROUTES
import { privateRoutes, publicRoutes } from "src/Routes/Routes";
// API
import Api from "src/Helpers/ApiHandler";

const api = new Api();

const Router = (): JSX.Element => {
	const { enqueueSnackbar } = useSnackbar();

	let routes = publicRoutes;
	const loggedIn: boolean = useSelector((state: reducerTypes) => state.Auth.loggedIn) !== null;

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
