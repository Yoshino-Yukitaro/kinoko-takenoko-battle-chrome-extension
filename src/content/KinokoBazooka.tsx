interface KinokoBazookaProps {
	yAxis: number;
}

const KinokoBazooka = ({ yAxis }: KinokoBazookaProps) => {
	return (
		<div style={{ position: "absolute", left: "0px", top: `${yAxis}px` }}>
			<h1>あ</h1>
		</div>
	);
};

export default KinokoBazooka;
