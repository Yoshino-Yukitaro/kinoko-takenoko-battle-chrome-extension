interface TakenokoBazookaProps {
	yAxis: number;
}

const TakenokoBazooka = ({ yAxis }: TakenokoBazookaProps) => {
	return (
		<div style={{ position: "absolute", right: "0px", top: `${yAxis}px` }}>
			<h1>あ</h1>
		</div>
	);
};

export default TakenokoBazooka;
