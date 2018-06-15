module.exports =
	({
		createElement,
		withPrecision,
	}) => {
		return (
			{
				down:
					createVertical({
						fill: "darkgreen",
						idPrefix: "down",
						preserveAspectRatio: "xMidYMax slice",
						transform: point => point,
					}),
				right:
					create({
						fill: "darkred",
						height: 22,
						horizontalMargin: 9,
						idPrefix: "right",
						paddingRight: 3,
						preserveAspectRatio: "xMaxYMid slice",
						transform: swapAxis,
					}),
				up:
					createVertical({
						fill: "darkred",
						idPrefix: "up",
						preserveAspectRatio: "xMidYMin slice",
						transform: flipFirstAxis,
					}),
			});

		function createVertical({
			fill,
			idPrefix,
			preserveAspectRatio,
			transform,
		}) {
			return (
				create({
					fill,
					height: 22,
					horizontalMargin: 10,
					idPrefix,
					paddingRight: 0,
					preserveAspectRatio,
					transform,
				}));
		}

		function create({
			fill,
			height,
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
					height,
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
					));
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
					));

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
				]);
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