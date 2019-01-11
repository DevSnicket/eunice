module.exports =
	({
		arrows,
		countSelector,
		down,
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
					relationship:
						up.relationship,
				})
			);
		}
	};

function getForDirectionWhenAny({
	arrow,
	count,
	relationship,
}) {
	return (
		count
		&&
		{ arrow, count, relationship }
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