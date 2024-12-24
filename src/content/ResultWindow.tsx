import { useEffect, useState } from "react";

interface ResultWindowProps {
	kinikoScore: number;
	takenokoScore: number;
	clickToStart: () => void;
}

interface ResultProps {
	kinikoScore: number;
	takenokoScore: number;
}

const ResultWindow = ({
	kinikoScore,
	takenokoScore,
	clickToStart,
}: ResultWindowProps) => {
	const [displayState, setDisplayState] = useState<"start" | "end">("start");
	const Result = ({ kinikoScore, takenokoScore }: ResultProps) => {
		if (kinikoScore > takenokoScore) {
			return (
				<h2 style={{ fontSize: "48px", fontWeight: "bold", marginTop: "90px" }}>
					きのこの勝ち！
				</h2>
			);
		}
		if (kinikoScore < takenokoScore) {
			return (
				<h2 style={{ fontSize: "48px", fontWeight: "bold", marginTop: "90px" }}>
					たけのこの勝ち！
				</h2>
			);
		}
		return (
			<h2 style={{ fontSize: "48px", fontWeight: "bold", marginTop: "90px" }}>
				引き分け
			</h2>
		);
	};
	const resultText = () => {
		if (kinikoScore > takenokoScore) {
			return "きのこの勝ち！";
		}
		if (kinikoScore < takenokoScore) {
			return "たけのこの勝ち！";
		}
		return "引き分け！";
	};
	const gameEnd = () => {
		chrome.storage.local.remove("active");
	};
	useEffect(() => {
		setTimeout(() => {
			setDisplayState("end");
		}, 1300);
	}, []);
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				margin: "auto",
				width: "400px",
				height: "300px",
				backgroundColor: "white",
				color: "#392921",
				borderRadius: "16px",
				textAlign: "center",
			}}
		>
			{displayState === "start" ? (
				<h2 style={{ fontSize: "48px", fontWeight: "bold", marginTop: "90px" }}>
					結果発表
				</h2>
			) : (
				<div>
					<Result kinikoScore={kinikoScore} takenokoScore={takenokoScore} />
					<div style={{ border: "none", margin: "48px 0 32px" }}>
						<button
							type="button"
							onClick={() => clickToStart()}
							style={{
								margin: "0 20px",
								width: "120px",
								backgroundColor: "#F4D386",
								height: "40px",
								borderRadius: "24px",
								fontSize: "16px",
							}}
						>
							もう一度戦う
						</button>
						<button
							type="button"
							style={{
								margin: "0 20px",
								width: "120px",
								backgroundColor: "#392921",
								color: "#F4D386",
								height: "40px",
								borderRadius: "24px",
								fontSize: "16px",
							}}
							onClick={gameEnd}
						>
							終わる
						</button>
					</div>
					<a
						href={`https://twitter.com/intent/tweet?text=きのこたけのこバトルの結果%0aきのこ:%20${kinikoScore}%0aたけのこ:%20${takenokoScore}%0aで${resultText()}&hashtags=きのこたけのこバトル`}
						style={{
							padding: "10px 20px",
							backgroundColor: "black",
							color: "white",
							height: "40px",
							borderRadius: "24px",
							fontSize: "16px",
						}}
					>
						Xに共有する
					</a>
				</div>
			)}
		</div>
	);
};

export default ResultWindow;
