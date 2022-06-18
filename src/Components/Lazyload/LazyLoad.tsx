import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
// STYLES
import style from "src/Components/Lazyload/LazyLoad.style";

/** Fallback UI when page is loading. */
const LazyLoad = (): JSX.Element => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(true);

		return () => {
			setOpen(false);
		};
	}, []);

	return (
		<Backdrop sx={style.backdrop} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default LazyLoad;
