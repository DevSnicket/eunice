// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDownSymbol = require("./createDownSymbol"),
	createRightSymbol = require("./createRightSymbol"),
	createUpSymbol = require("./createUpSymbol");

const
	height =
		24,
	marginAndPaddingForVertical =
		{
			horizontalMargin: 10,
			paddingRight: 0,
		};

module.exports =
	({
		createElement,
		withPrecision,
	}) =>
		(
			{
				down:
					createDown({
						createElement,
						id: formatId("down"),
					}),
				right:
					createRight({
						createElement,
						id: formatId("right"),
					}),
				up:
					createUp({
						createElement,
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
					id,
				}),
		}
	);
}

function createRight({
	createElement,
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
					id,
				}),
		}
	);
}

function createUp({
	createElement,
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
					id,
					withPrecision,
				}),
		}
	);
}