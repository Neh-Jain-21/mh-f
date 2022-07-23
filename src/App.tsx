import { createRef } from "react";
import { Provider } from "react-redux";
import { Button } from "@mui/material";
import { SnackbarProvider, SnackbarKey } from "notistack";
import { BrowserRouter } from "react-router-dom";
// REDUX
import store from "src/Redux/store";
// ROUTES
import Router from "src/Routes/Router";

const SnackBarButton =
	(notistackRef: React.RefObject<SnackbarProvider>) =>
	(key: SnackbarKey): JSX.Element => {
		const handleClick = (): void => {
			if (notistackRef.current) {
				notistackRef.current.closeSnackbar(key);
			}
		};

		return (
			<Button sx={{ color: "white" }} onClick={handleClick}>
				Dismiss
			</Button>
		);
	};

const App = (): JSX.Element => {
	const notistackRef = createRef<SnackbarProvider>();

	return (
		<SnackbarProvider ref={notistackRef} action={SnackBarButton(notistackRef)}>
			<Provider store={store}>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</Provider>
		</SnackbarProvider>
	);
};

export default App;
