module.exports =
	({
		createElement,
		withPrecision,
	}) => {
		return (
			{
				down:
					createArrowVertical({
						/* cspell:disable-next-line */
						fill: "darkgreen",
						idPrefix: "down",
						preserveAspectRatio: "xMidYMax slice",
						transform: point => point,
					}),
				right:
					createArrow({
						/* cspell:disable-next-line */
						fill: "darkred",
						horizontalMargin: 9,
						idPrefix: "right",
						paddingRight: 3,
						preserveAspectRatio: "xMaxYMid slice",
						transform: swapAxis,
					}),
				up:
					createArrowVertical({
						/* cspell:disable-next-line */
						fill: "darkred",
						idPrefix: "up",
						preserveAspectRatio: "xMidYMin slice",
						transform: flipFirstAxis,
					}),
			});

		function createArrowVertical({
			fill,
			idPrefix,
			preserveAspectRatio,
			transform,
		}) {
			return (
				createArrow({
					fill,
					horizontalMargin: 10,
					idPrefix,
					paddingRight: 0,
					preserveAspectRatio,
					transform,
				})
			);
		}

		function createArrow({
			fill,
			horizontalMargin,
			idPrefix,
			paddingRight,
			preserveAspectRatio,
			transform,
		}) {
			const id = `${idPrefix}-arrow`;

			return (
				{
					element: createSymbolWithPolygon(createPolygon()),
					height: 24,
					horizontalMargin,
					id,
					paddingRight,
				});

			function createSymbolWithPolygon(
				polygon,
			) {
				return (
					createElement(
						"symbol",
						{
							id,
							key: id,
							preserveAspectRatio,
							viewBox: "0,0,1,1",
						},
						polygon,
					)
				);
			}

			function createPolygon() {
				return (
					createElement(
						"polygon",
						{
							fill,
							key: "polygon",
							points:
								[
									[ 0, 0.85 ],
									[ 0, 0 ],
									[ 1, 0 ],
									[ 1, 0.85 ],
									[ 0.5, 1 ],
								]
								.map(point => scaleAndFormatPoint(transform(point)))
								.join(" "),
						},
					)
				);

				function scaleAndFormatPoint(
					point,
				) {
					return `${point[0]},${point[1]}`;
				}
			}
		}

		function flipFirstAxis(
			point,
		) {
			return (
				[
					point[0],
					withPrecision(1 - point[1]),
				]
			);
		}
	};

function swapAxis(
	point,
) {
	return [ point[1], point[0] ];
}