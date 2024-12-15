import { useEffect, useState } from "react";

const ActivateSwitch = () => {
	const [active, setActive] = useState(true);
	const handleChange = () => {
		setActive(!active);
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
		</div>
	);
};

export default ActivateSwitch;
