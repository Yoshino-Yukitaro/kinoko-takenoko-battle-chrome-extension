interface DynamicTextProps {
	text: string;
}

const DynamicText = ({ text }: DynamicTextProps) => {
	if (text.trim().length === 0) {
		return <></>;
	}

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				color: "white",
				textAlign: "center",
				height: "100%",
			}}
		>
			<div>
				<h2 style={{ lineHeight: "100vh", fontSize: "128px" }}>{text}</h2>
			</div>
		</div>
	);
};

export default DynamicText;
