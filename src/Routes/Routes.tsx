import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
// COMPONENTS
const Layout = lazy(() => import("src/Components/Layout/Layout"));
// PAGES
const Landing = lazy(() => import("src/Pages/Landing/Landing"));
const Login = lazy(() => import("src/Pages/Login/Login"));
const Signup = lazy(() => import("src/Pages/Signup/Signup"));
const ForgotPassword = lazy(() => import("src/Pages/ForgotPassword/ForgotPassword"));
const Dashboard = lazy(() => import("src/Pages/Dashboard/Dashboard"));
const Images = lazy(() => import("src/Pages/Images/Images"));

/**Add your public routes here */
const publicRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Outlet />,
		children: [
			{ path: "/", element: <Landing /> },
			{ path: "/login", element: <Login /> },
			{ path: "/signup", element: <Signup /> },
			{ path: "/forgot-password", element: <ForgotPassword /> },
			{ path: "*", element: <Navigate to="/" replace /> },
		],
	},
];

/**Add your private routes here */
const privateRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "images", element: <Images /> },
			{ path: "/", element: <Navigate to="/dashboard" replace /> },
			{ path: "*", element: <Navigate to="/dashboard" replace /> },
		],
	},
];

export { privateRoutes, publicRoutes };
