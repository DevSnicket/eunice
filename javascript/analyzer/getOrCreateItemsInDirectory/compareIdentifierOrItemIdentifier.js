// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

module.exports =
	(
		left,
		right,
	) => {
		const
			leftIdentifier = getIdentifier(left),
			rightIdentifier = getIdentifier(right);

		return (
			leftIdentifier !== rightIdentifier
			&&
			(leftIdentifier < rightIdentifier ? -1 : 1)
		);
	};

function getIdentifier(
	item,
) {
	return (
		(item.id || item)
		.replace(
			new RegExp(getPathSeparatorEscaped(), "g"),
			String.fromCharCode(0),
		)
	);

	function getPathSeparatorEscaped() {
		return path.sep.replace("\\", "\\\\");
	}
}