import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { reducerTypes } from "src/Redux/reducers";
// COMPONENTS
import LazyLoad from "src/Components/Lazyload/LazyLoad";
// ROUTES
import { privateRoutes, publicRoutes } from "src/Routes/Routes";

const Router = (): JSX.Element => {
	let routes = publicRoutes;
	const loggedIn: boolean = useSelector((state: reducerTypes) => state.Auth.loggedIn) !== null;

	if (loggedIn) routes = privateRoutes;

	const routing = useRoutes(routes);

	return <Suspense fallback={<LazyLoad />}>{routing}</Suspense>;
};

export default Router;
