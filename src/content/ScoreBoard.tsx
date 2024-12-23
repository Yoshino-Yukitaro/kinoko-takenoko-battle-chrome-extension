interface ScoreBoardProps {
	takenokoScore: number;
	kinokoScore: number;
}

const ScoreBoard = ({ takenokoScore, kinokoScore }: ScoreBoardProps) => {
	return (
		<div
			style={{
				height: "60px",
				backgroundColor: "white",
				position: "absolute",
				top: "10px",
				left: "10px",
				display: "flex",
				alignItems: "center",
				justifyContent: "start",
				textAlign: "center",
				paddingRight: "24px",
				borderRadius: "16px",
			}}
		>
			<div style={{ transform: "rotate(270deg) scale(0.5)" }}>
				<div
					style={{
						position: "relative",
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
			<p style={{ color: "#392921", fontSize: "24px", margin: 0 }}>
				{kinokoScore}
			</p>
			<div style={{ transform: "rotate(90deg) scale(0.5)" }}>
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
			<p style={{ color: "#392921", fontSize: "24px", margin: 0 }}>
				{takenokoScore}
			</p>
		</div>
	);
};

export default ScoreBoard;
