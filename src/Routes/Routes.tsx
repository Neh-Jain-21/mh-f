import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
// PAGES
const Landing = lazy(() => import("src/Pages/Landing/Landing"));
/**Add your public routes here */
const publicRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Outlet />,
		children: [
			{ path: "/", element: <Landing /> },
			{ path: "*", element: <Navigate to="/" replace /> },
		],
	},
];

/**Add your private routes here */
const privateRoutes: RouteObject[] = [
	// {
	// 	path: "/",
	// 	element: <Layout />,
	// 	children: [
	// 		{ path: "dashboard", element: <Dashboard /> },
	// 		{ path: "/", element: <Navigate to="/dashboard" replace /> },
	// 		{ path: "*", element: <Navigate to="/dashboard" replace /> },
	// 	],
	// },
];

export { privateRoutes, publicRoutes };
