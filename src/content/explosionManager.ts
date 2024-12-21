interface LeafRect {
	rightTop: { x: number; y: number };
	rightBottom: { x: number; y: number };
	leftx: number;
	id: string;
}

class ExplosionManager {
	private static instance: ExplosionManager;
	private domRects: LeafRect[];
	private constructor() {
		this.domRects = (() => {
			const maxWindowWidth = window.innerWidth;
			const leaves: LeafRect[] = [];
			const traverse = (node: HTMLElement) => {
				if (
					node.nodeType === node.TEXT_NODE &&
					node.textContent?.trim() !== "" &&
					node.parentElement
				) {
					const parent = node.parentElement;
					const rect = parent.getBoundingClientRect();
					const x = maxWindowWidth - rect.right;
					const id: string = Math.random().toString();
					parent.id = id;
					leaves.push({
						rightTop: { x, y: rect.top },
						rightBottom: { x, y: rect.bottom },
						leftx: rect.left,
						id,
					});
				}
				for (const child of node.childNodes) {
					traverse(child as HTMLElement);
				}
			};
			// const traverse = (node: HTMLElement) => {
			// 	if (
			// 		node.childNodes.length === 1 &&
			// 		node.textContent &&
			// 		node.getBoundingClientRect
			// 	) {
			// 		const rect = node.getBoundingClientRect();
			// 		const x = maxWindowWidth - rect.right;
			// 		const id: string = Math.random().toString();
			// 		node.id = id;
			// 		leaves.push({
			// 			rightTop: { x, y: rect.top },
			// 			rightBottom: { x, y: rect.bottom },
			// 			leftx: rect.left,
			// 			id,
			// 		});
			// 	}
			// 	for (const child of node.childNodes) {
			// 		traverse(child as HTMLElement);
			// 	}
			// };
			traverse(document.body);
			return leaves;
		})();
	}
	public static getInstance() {
		if (!ExplosionManager.instance) {
			ExplosionManager.instance = new ExplosionManager();
		}
		return ExplosionManager.instance;
	}
	public judge(x: number, y: number, kind: "kinoko" | "takenoko"): boolean {
		const explodedLeafs = this.domRects.filter((rect) => {
			if (kind === "kinoko") {
				return x > rect.leftx && y < rect.rightBottom.y && y > rect.rightTop.y;
			}
			return (
				x > rect.rightTop.x && y < rect.rightBottom.y && y > rect.rightTop.y
			);
		});
		if (explodedLeafs.length > 0) {
			this.explodeAround(x, y, kind);
			return true;
		}
		return false;
	}
	private explodeAround(x: number, y: number, kind: "kinoko" | "takenoko") {
		const explodedLeafs = this.domRects.filter((rect) => {
			// 半径100px以内にあるかどうかを判定
			if (kind === "kinoko") {
				return (x - rect.leftx) ** 2 + (rect.rightTop.y - y) ** 2 < 10000;
			}
			return (rect.rightTop.x - x) ** 2 + (rect.rightTop.y - y) ** 2 < 10000;
		});

		for (const leaf of explodedLeafs) {
			this.explode(leaf.id, x, y, kind);
		}
	}
	private explode(
		leafId: string,
		cx: number,
		cy: number,
		kind: "kinoko" | "takenoko",
	) {
		const vector = kind === "kinoko" ? 1 : -1;
		const leaf = document.getElementById(leafId);
		const maxWindowWidth = window.innerWidth;
		if (leaf) {
			// leafの中のテキストを取得して、個別のspan要素に分割する
			const text = leaf.textContent;
			if (text) {
				leaf.style.overflow = "visible";
				if (text.length > 1) {
					const spans = text.split("").map((char) => {
						const span = document.createElement("span");
						span.style.position = "relative";
						span.style.transition = "1s all";
						span.style.zIndex = "256";
						span.style.display = "inline-block";
						span.textContent = char;
						span.id = Math.random().toString();
						return span;
					});
					// leafの中身をspan要素に置き換える
					leaf.textContent = "";
					for (const span of spans) {
						leaf.appendChild(span);
					}

					// 半径100px以内にあるspan要素を抽出
					const explodedSpans = spans.filter((span) => {
						const rect = span.getBoundingClientRect();
						if (kind === "kinoko") {
							return (cx - rect.left) ** 2 + (rect.top - cy) ** 2 < 10000;
						}
						return (
							(maxWindowWidth - rect.right - cx) ** 2 + (rect.top - cy) ** 2 <
							10000
						);
					});

					// span要素をランダムに動かす
					for (const span of explodedSpans) {
						const calcDistance = () => {
							if (kind === "kinoko") {
								return Math.sqrt(
									(span.getBoundingClientRect().left - cx) ** 2 +
										(span.getBoundingClientRect().top - cy) ** 2,
								);
							}
							return Math.sqrt(
								(maxWindowWidth - span.getBoundingClientRect().right - cx) **
									2 +
									(span.getBoundingClientRect().top - cy) ** 2,
							);
						};
						const calcTx = () => {
							if (kind === "kinoko") {
								return (
									(110 / calcDistance()) *
										(span.getBoundingClientRect().left - cx) +
									(Math.random() - 0.5) * 5
								);
							}
							return (
								(110 / calcDistance()) *
									(maxWindowWidth - span.getBoundingClientRect().right - cx) +
								(Math.random() - 0.5) * 5
							);
						};
						const ty =
							(110 / calcDistance()) * (span.getBoundingClientRect().top - cy) +
							(Math.random() - 0.5) * 5;
						const rotate = (Math.random() - 0.5) * 360;
						span.style.transform = `translate(${calcTx() * vector}px, ${ty}px) rotate(${rotate}deg)`;
					}

					// domRectsを更新する
					this.domRects = [
						...this.domRects.filter((rect) => rect.id !== leafId),
						...spans.map((span) => {
							const rect = span.getBoundingClientRect();
							const x = maxWindowWidth - rect.right;
							return {
								rightTop: { x, y: rect.top },
								rightBottom: { x, y: rect.bottom },
								leftx: rect.left,
								id: span.id,
							};
						}),
					];
					return;
				}

				leaf.style.transition = "1s all";
				leaf.style.position = "relative";
				leaf.style.zIndex = "256";
				leaf.style.display = "inline-block";
				const calcDistance = () => {
					if (kind === "kinoko") {
						return Math.sqrt(
							(leaf.getBoundingClientRect().left - cx) ** 2 +
								(leaf.getBoundingClientRect().top - cy) ** 2,
						);
					}
					return Math.sqrt(
						(maxWindowWidth - leaf.getBoundingClientRect().right - cx) ** 2 +
							(leaf.getBoundingClientRect().top - cy) ** 2,
					);
				};
				const calcTx = () => {
					if (kind === "kinoko") {
						return (
							(110 / calcDistance()) *
								(leaf.getBoundingClientRect().left - cx) +
							(Math.random() - 0.5) * 5
						);
					}
					return (
						(110 / calcDistance()) *
							(maxWindowWidth - leaf.getBoundingClientRect().right - cx) +
						(Math.random() - 0.5) * 5
					);
				};
				const ty =
					(110 / calcDistance()) * (leaf.getBoundingClientRect().top - cy) +
					(Math.random() - 0.5) * 1;
				const rotate = (Math.random() - 0.5) * 360;
				leaf.style.transform = `translate(${calcTx() * vector}px, ${ty}px) rotate(${rotate}deg)`;

				// domRectsを更新する
				const rect = leaf.getBoundingClientRect();
				const x = maxWindowWidth - rect.right;
				this.domRects = [
					...this.domRects.filter((rect) => rect.id !== leafId),
					{
						rightTop: { x, y: rect.top },
						rightBottom: { x, y: rect.bottom },
						leftx: rect.left,
						id: leafId,
					},
				];
			}
		}
	}
}

export default ExplosionManager;
