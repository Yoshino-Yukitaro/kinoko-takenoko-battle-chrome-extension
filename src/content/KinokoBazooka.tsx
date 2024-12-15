interface KinokoBazookaProps {
	yAxis: number;
}

const KinokoBazooka = ({ yAxis }: KinokoBazookaProps) => {
	return (
		<div style={{ position: "absolute", left: "0px", top: `${yAxis}px` }}>
			<div
				style={{
					position: "relative",
					width: "80px",
					height: "40px",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "0",
						left: "0%",
						backgroundColor: "#F4D386",
						width: "70px",
						height: "15px",
						borderRadius: "16px",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: "-12.5px",
							left: "40px",
							backgroundColor: "#392921",
							width: "30px",
							height: "40px",
							clipPath: "ellipse(40px 23px at -30% 50%)",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default KinokoBazooka;
