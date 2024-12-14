import React from "react";
import { createRoot } from "react-dom/client";
import BattleField from "./BattleField";

let flg = true;

if (flg) {
	const battlePanel = document.createElement("div");
	battlePanel.style.position = "absolute";
	battlePanel.style.width = "100vw";
	battlePanel.style.height = "100vh";
	battlePanel.style.top = "0";
	battlePanel.style.left = "0";
	battlePanel.style.zIndex = "255";
	document.body.appendChild(battlePanel);
	document.body.style.overflow = "hidden";
	createRoot(battlePanel).render(
		<React.StrictMode>
			<BattleField />
		</React.StrictMode>,
	);
}
