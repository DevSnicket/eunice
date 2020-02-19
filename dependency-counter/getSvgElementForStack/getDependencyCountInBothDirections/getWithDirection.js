// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	arrows,
	countSelector,
	down,
	level,
	up,
}) => {
	return (
		concatenateWhenEither(
			getDown(),
			getUp(),
		)
	);

	function getDown() {
		return (
			down.dependencies
			&&
			getForDirectionWhenAny({
				arrow:
					arrows.down,
				count:
					countSelector(down.dependencies),
				level,
				relationship:
					down.relationship,
			})
		);
	}

	function getUp() {
		return (
			up.dependencies
			&&
			getForDirectionWhenAny({
				arrow:
					arrows.up,
				count:
					countSelector(up.dependencies),
				level,
				relationship:
					up.relationship,
			})
		);
	}
};

function getForDirectionWhenAny({
	arrow,
	count,
	level,
	relationship,
}) {
	return (
		count
		&&
		{ arrow, count, level, relationship }
	);
}

function concatenateWhenEither(
	first,
	second,
) {
	return (
		(first || second)
		&&
		[
			...first ? [ first ] : [],
			...second ? [ second ] : [],
		]
	);
}