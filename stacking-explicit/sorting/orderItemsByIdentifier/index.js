module.exports =
	items => {
		return whenArray() || items;

		function whenArray() {
			return (
				Array.isArray(items)
				&&
				items.sort(
					(left, right) =>
						compareIdentifiers(
							getItemIdentifier(left),
							getItemIdentifier(right),
						),
				)
			);
		}
	};

function getItemIdentifier(
	item,
) {
	return item.id;
}

function compareIdentifiers(
	left,
	right,
) {
	return (
		left !== right
		&&
		(whenNoValues() || compareValues())
	);

	function whenNoValues() {
		return (
			(!left && -1)
			||
			(!right && 1)
		);
	}

	function compareValues() {
		return left < right ? -1 : 1;
	}
}