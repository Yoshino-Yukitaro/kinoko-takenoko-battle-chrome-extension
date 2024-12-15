import React from "react";
import { createRoot } from "react-dom/client";
import BattleField from "./BattleField";
import ExplosionManager from "./explosionManager";

const activate = () => {
	ExplosionManager.getInstance();
	const battlePanel = document.createElement("div");
	battlePanel.id = "battlePanel";
	battlePanel.style.position = "absolute";
	battlePanel.style.width = "100vw";
	battlePanel.style.height = "100vh";
	battlePanel.style.top = "0";
	battlePanel.style.left = "0";
	battlePanel.style.zIndex = "255";
	document.body.style.overflow = "hidden";
	document.body.appendChild(battlePanel);
	createRoot(battlePanel).render(
		<React.StrictMode>
			<BattleField />
		</React.StrictMode>,
	);
};

const deactivate = () => {
	const battlePanel = document.getElementById("battlePanel");
	if (battlePanel) {
		battlePanel.remove();
	}
	document.body.style.overflow = "auto";
};

chrome.storage.onChanged.addListener((changes) => {
	if (changes.active) {
		if (changes.active.newValue) {
			activate();
		} else {
			deactivate();
		}
	}
});

chrome.storage.local.get("active", (data) => {
	if (data.active) {
		activate();
	}
});
