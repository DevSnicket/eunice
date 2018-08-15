require("array.prototype.flatmap")
.shim();

const
	generateAncestors = require("./findDirectionBetweenItemsInFirstMutualStack/generateAncestors"),
	getDirectionBetweenWhenAny = require("./findDirectionBetweenItemsInFirstMutualStack/getDirectionBetweenWhenAny");

module.exports =
	({
		from,
		to,
	}) =>
		getDirectionBetweenWhenAny({
			from,
			to,
		})
		||
		getDirectionBetweenFirstAncestorOrThrowError(
			generateAncestors({
				from,
				to,
			})
		);

function getDirectionBetweenFirstAncestorOrThrowError(
	ancestors
) {
	for (const ancestor of ancestors) {
		const direction = getDirectionBetweenWhenAny(ancestor);

		if (direction)
			return direction;
	}

	/* istanbul ignore next: error is only thrown when there is gap in the implementation */
	throw Error("Could not find direction between items in first mutual stack.");
}