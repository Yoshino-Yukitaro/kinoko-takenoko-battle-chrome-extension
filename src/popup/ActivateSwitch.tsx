import { useEffect, useState } from "react";

const ActivateSwitch = () => {
	const [active, setActive] = useState(false);
	const handleChange = () => {
		setActive(!active);
	};
	const startBattle = () => {
		setActive(true);
	};
	useEffect(() => {
		if (active) {
			chrome.storage.local.set({ active: true });
		} else {
			chrome.storage.local.remove("active");
		}
	}, [active]);
	return (
		<div>
			<label htmlFor="activate">有効化</label>
			<input
				type="checkbox"
				id="activate"
				checked={active}
				onChange={handleChange}
			/>
			<button
				type="button"
				onClick={startBattle}
				disabled={active}
				style={{
					border: "none",
					padding: "0.5rem 1rem",
					cursor: "pointer",
					backgroundColor: "#F4D386",
					color: "#392921",
					fontSize: "16px",
					fontWeight: "bold",
					borderRadius: "24px",
				}}
			>
				対戦を始める
			</button>
		</div>
	);
};

export default ActivateSwitch;
