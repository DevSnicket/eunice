// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDownSymbol from "./createDownSymbol";
import createRightSymbol from "./createRightSymbol";
import createUpSymbol from "./createUpSymbol";

const
	colorsDefault =
		{
			/* cspell:disable-next-line */
			green: "darkgreen",
			/* cspell:disable-next-line */
			red: "darkred",
		},
	height =
		24,
	marginAndPaddingForVertical =
		{
			horizontalMargin: 10,
			paddingRight: 0,
		};

export default ({
	colors: { red, green } = colorsDefault,
	createElement,
	withPrecision,
}) =>
	(
		{
			down:
				createDown({
					createElement,
					fill: green,
					id: formatId("down"),
				}),
			right:
				createRight({
					createElement,
					fill: red,
					id: formatId("right"),
				}),
			up:
				createUp({
					createElement,
					fill: red,
					id: formatId("up"),
					withPrecision,
				}),
		}
	);

function formatId(
	id,
) {
	return `${id}-arrow`;
}

function createDown({
	createElement,
	fill,
	id,
}) {
	return (
		{
			...marginAndPaddingForVertical,
			height,
			id,
			symbol:
				createDownSymbol({
					createElement,
					fill,
					id,
				}),
		}
	);
}

function createRight({
	createElement,
	fill,
	id,
}) {
	return (
		{
			height,
			horizontalMargin: 9,
			id,
			paddingRight: 3,
			symbol:
				createRightSymbol({
					createElement,
					fill,
					id,
				}),
		}
	);
}

function createUp({
	createElement,
	fill,
	id,
	withPrecision,
}) {
	return (
		{
			...marginAndPaddingForVertical,
			height,
			id,
			symbol:
				createUpSymbol({
					createElement,
					fill,
					id,
					withPrecision,
				}),
		}
	);
}