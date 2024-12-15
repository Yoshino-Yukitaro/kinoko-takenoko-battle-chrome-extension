import React from "react";
import { createRoot } from "react-dom/client";
import ActivateSwitch from "./ActivateSwitch";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<h1>popup</h1>
		<ActivateSwitch />
	</React.StrictMode>,
);
