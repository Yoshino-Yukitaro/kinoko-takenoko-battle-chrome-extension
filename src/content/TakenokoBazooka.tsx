interface TakenokoBazookaProps {
	yAxis: number;
}

const TakenokoBazooka = ({ yAxis }: TakenokoBazookaProps) => {
	return (
		<div style={{ position: "absolute", right: "0px", top: `${yAxis}px` }}>
			<div
				style={{
					position: "relative",
					backgroundColor: "#F4D386",
					width: "80px",
					height: "40px",
					clipPath: "ellipse(70px 20px at 100% 50%)",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "0",
						left: "0%",
						backgroundColor: "#392921",
						width: "70px",
						height: "40px",
						paddingLeft: "20px",
					}}
				/>
			</div>
		</div>
	);
};

export default TakenokoBazooka;
