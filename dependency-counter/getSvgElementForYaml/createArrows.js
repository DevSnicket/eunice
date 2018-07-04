module.exports =
	({
		createElement,
		withPrecision,
	}) => {
		return (
			{
				down:
					createArrowVertical({
						fill: "darkgreen",
						idPrefix: "down",
						preserveAspectRatio: "xMidYMax slice",
						transform: point => point,
					}),
				right:
					createArrow({
						fill: "darkred",
						horizontalMargin: 9,
						idPrefix: "right",
						paddingRight: 3,
						preserveAspectRatio: "xMaxYMid slice",
						transform: swapAxis,
					}),
				up:
					createArrowVertical({
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
					height: 22,
					horizontalMargin,
					id,
					paddingRight,
				});

			function createSymbolWithPolygon(
				polygon
			) {
				return (
					createElement(
						"symbol",
						{
							id,
							preserveAspectRatio,
							viewBox: "0,0,1,1",
						},
						polygon
					)
				);
			}

			function createPolygon() {
				return (
					createElement(
						"polygon",
						{
							fill,
							points:
								pointsForDownArrow
								.map(point => scaleAndFormatPoint(transform(point)))
								.join(" "),
						}
					)
				);

				function scaleAndFormatPoint(
					point
				) {
					return `${point[0]},${point[1]}`;
				}
			}
		}

		function flipFirstAxis(
			point
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
	point
) {
	return [ point[1], point[0] ];
}

const pointsForDownArrow =
	[
		[ 0, 0.8 ],
		[ 0, 0 ],
		[ 1, 0 ],
		[ 1, 0.8 ],
		[ 0.5, 1 ],
	];