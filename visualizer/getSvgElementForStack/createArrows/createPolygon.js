// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const points =
	[
		[ 0, 0.85 ],
		[ 0, 0 ],
		[ 1, 0 ],
		[ 1, 0.85 ],
		[ 0.5, 1 ],
	];

module.exports =
	({
		createElement,
		fill,
		transform,
	}) =>
		createElement(
			"polygon",
			{
				fill,
				key: "polygon",
				points:
					points
					.map(point => formatPoint(transform(point)))
					.join(" "),
			},
		);

function formatPoint(
	point,
) {
	return `${point[0]},${point[1]}`;
}