const KeyIntroBoard = () => {
	return (
		<div
			style={{
				height: "60px",
				width: "500px",
				position: "absolute",
				top: 0,
				right: 0,
				left: 0,
				margin: "10px auto 0",
				padding: "0 16px",
				backgroundColor: "white",
				display: "flex",
				color: "#392921",
				textAlign: "center",
				justifyContent: "space-between",
				alignItems: "center",
				borderRadius: "16px",
			}}
		>
			<div
				style={{
					display: "flex",
					margin: 0,
					height: "fit-content",
					borderRadius: "16px",
					paddingRight: "12px",
				}}
			>
				<div style={{ transform: "rotate(270deg) scale(0.4)" }}>
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
				<p style={{ margin: "0 4px" }}>up: w</p>
				<p style={{ margin: "0 4px" }}>down: s</p>
				<p style={{ margin: "0 4px" }}>👊: d</p>
			</div>
			<h2 style={{ fontSize: "28px" }}>keys</h2>
			<div
				style={{
					display: "flex",
					margin: 0,
					height: "fit-content",
					borderRadius: "16px",
					paddingLeft: "12px",
				}}
			>
				<p style={{ margin: "0 4px" }}>up: ↑</p>
				<p style={{ margin: "0 4px" }}>down: ↓</p>
				<p style={{ margin: "0 4px" }}>👊: ←</p>
				<div style={{ transform: "rotate(90deg) scale(0.4)" }}>
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
			</div>
		</div>
	);
};

export default KeyIntroBoard;
