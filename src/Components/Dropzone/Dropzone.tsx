import { useCallback, useMemo } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";

const baseStyle: React.CSSProperties = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	userSelect: "none",
	justifyContent: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
};

const activeStyle: React.CSSProperties = { borderColor: "#2196f3" };

const acceptStyle: React.CSSProperties = { borderColor: "#00e676" };

const rejectStyle: React.CSSProperties = { borderColor: "#ff1744" };

interface DropZoneProps {
	/** hides or shows dropzone */
	hidden: boolean;

	/** Handle file change */
	onChange: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void;
}

const Dropzone = (props: DropZoneProps) => {
	/** Handle file change */
	const onDrop = useCallback<typeof props.onChange>(props.onChange, []); // eslint-disable-line

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] }, onDrop, multiple: false });

	const style = useMemo(
		() => ({ ...baseStyle, ...(isDragActive ? activeStyle : {}), ...(isDragAccept ? acceptStyle : {}), ...(isDragReject ? rejectStyle : {}) }),
		[isDragActive, isDragReject, isDragAccept]
	);

	return (
		<div style={{ margin: "20px" }} hidden={props.hidden}>
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
				<em>(Only *.jpeg and *.png images will be accepted)</em>
			</div>
		</div>
	);
};

export default Dropzone;
