interface LeafRect {
	rightTop: { x: number; y: number };
	rightBottom: { x: number; y: number };
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
					node.childNodes.length === 1 &&
					node.textContent &&
					node.getBoundingClientRect
				) {
					const rect = node.getBoundingClientRect();
					const x = maxWindowWidth - rect.right;
					const id: string = Math.random().toString();
					node.id = id;
					leaves.push({
						rightTop: { x, y: rect.top },
						rightBottom: { x, y: rect.bottom },
						id,
					});
				}
				for (const child of node.childNodes) {
					traverse(child as HTMLElement);
				}
			};
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
	public judge(x: number, y: number): boolean {
		const explodedLeafs = this.domRects.filter((rect) => {
			return (
				x > rect.rightTop.x && y < rect.rightBottom.y && y > rect.rightTop.y
			);
		});
		if (explodedLeafs.length > 0) {
			this.explodeAround(x, y);
			console.log("Explosion!!!!!!!!!!!!!!!");
			return true;
		}
		return false;
	}
	private explodeAround(x: number, y: number) {
		const explodedLeafs = this.domRects.filter((rect) => {
			// 半径100px以内にあるかどうかを判定
			return (rect.rightTop.x - x) ** 2 + (rect.rightTop.y - y) ** 2 < 10000;
		});

		for (const leaf of explodedLeafs) {
			this.explode(leaf.id, x, y);
		}
	}
	private explode(leafId: string, cx: number, cy: number) {
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
						return (
							(maxWindowWidth - rect.right - cx) ** 2 + (rect.top - cy) ** 2 <
							10000
						);
					});

					// span要素をランダムに動かす
					for (const span of explodedSpans) {
						const distance = Math.sqrt(
							(maxWindowWidth - span.getBoundingClientRect().right - cx) ** 2 +
								(span.getBoundingClientRect().top - cy) ** 2,
						);
						const tx =
							(110 / distance) *
								(maxWindowWidth - span.getBoundingClientRect().right - cx) +
							(Math.random() - 0.5) * 5;
						const ty =
							(110 / distance) * (span.getBoundingClientRect().top - cy) +
							(Math.random() - 0.5) * 5;
						const rotate = (Math.random() - 0.5) * 360;
						span.style.transform = `translate(${tx * -1}px, ${ty}px) rotate(${rotate}deg)`;
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
				const distance = Math.sqrt(
					(maxWindowWidth - leaf.getBoundingClientRect().right - cx) ** 2 +
						(leaf.getBoundingClientRect().top - cy) ** 2,
				);
				console.log(distance);
				const tx =
					(110 / distance) *
						(maxWindowWidth - leaf.getBoundingClientRect().right - cx) +
					(Math.random() - 0.5) * 1;
				const ty =
					(110 / distance) * (leaf.getBoundingClientRect().top - cy) +
					(Math.random() - 0.5) * 1;
				const rotate = (Math.random() - 0.5) * 360;
				leaf.style.transform = `translate(${tx * -1}px, ${ty}px) rotate(${rotate}deg)`;

				// domRectsを更新する
				const rect = leaf.getBoundingClientRect();
				const x = maxWindowWidth - rect.right;
				this.domRects = [
					...this.domRects.filter((rect) => rect.id !== leafId),
					{
						rightTop: { x, y: rect.top },
						rightBottom: { x, y: rect.bottom },
						id: leafId,
					},
				];
			}
		}
	}
}

export default ExplosionManager;
