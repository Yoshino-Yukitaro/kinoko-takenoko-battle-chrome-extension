interface LimitBoardProps {
	limitMiliSec: number;
}

const LimitBoard = ({ limitMiliSec }: LimitBoardProps) => {
	const limitSec = Math.floor(limitMiliSec / 1000);
	const mili = Math.floor(limitMiliSec - limitSec * 1000);
	const render3digits = (num: number) => {
		if (num < 10) {
			return `00${num}`;
		}
		if (num < 100) {
			return `0${num}`;
		}
		return num;
	};
	return (
		<div
			style={{
				position: "absolute",
				top: "10px",
				right: "10px",
				height: "60px",
				width: "150px",
				backgroundColor: "white",
				color: "#392921",
				padding: "0 16px",
				borderRadius: "16px",
			}}
		>
			<p style={{ fontSize: "40px", margin: 0, textAlign: "left" }}>
				{limitSec}.
				<span style={{ fontSize: "24px" }}>{render3digits(mili)}</span>
			</p>
		</div>
	);
};

export default LimitBoard;
