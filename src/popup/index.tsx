import React from "react";
import { createRoot } from "react-dom/client";
import ActivateSwitch from "./ActivateSwitch";

const rootElement = document.getElementById("root") as HTMLElement;
rootElement.style.width = "400px";
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<div style={{ textAlign: "center", margin: "30px 0" }}>
			<h1
				style={{
					fontSize: "20px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
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
				きのこ・たけのこバトル
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
			</h1>
			<ActivateSwitch />
		</div>
	</React.StrictMode>,
);
