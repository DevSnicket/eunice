// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
/**
  * @param {Object} parameter
  * @param {import("./Parameter.d").Item} parameter.from
  * @param {import("./Parameter.d").Item} parameter.to
  * @returns {{direction: "above" | "below" | "same" | "self", mutualStack: import("./Parameter.d").Stack}}
  */
({
	from,
	to,
}) => {
	return (
		getWhenSame()
		||
		getWhenSameLevel()
		||
		getWhenSameStack()
		||
		getWhenToParent()
		||
		getWhenFromParent()
	);

	/** @returns {{direction: "self", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenSame() {
		return (
			from === to
			&&
			{
				direction: "self",
				mutualStack: from.level.stack,
			}
		);
	}

	/** @returns {{direction: "same", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenSameLevel() {
		return (
			from.level === to.level
			&&
			{
				direction: "same",
				mutualStack: from.level.stack,
			}
		);
	}

	function getWhenSameStack() {
		return (
			from.level.stack === to.level.stack
			&&
			getForStack(from.level.stack)
		);

		/**
		  * @param {import("./Parameter.d").Items & import("./Parameter.d").Stack} mutualStack
		  * @returns {{direction: "above"|"below", mutualStack: import("./Parameter.d").Stack}}
		  */
		function getForStack(
			mutualStack,
		) {
			return (
				{
					direction:
						getDirectionFromVector(
							getStackIndexOfItem(to)
							-
							getStackIndexOfItem(from),
						),
					mutualStack,
				}
			);

			function getStackIndexOfItem(
				{ level },
			) {
				return mutualStack.indexOf(level);
			}
		}
	}

	/** @returns {{direction: "below", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenToParent() {
		const toParent = to.level.stack.parent;

		return (
			from === toParent
			&&
			{
				direction: "below",
				mutualStack: toParent.items,
			}
		);
	}

	/** @returns {{direction: "above", mutualStack: import("./Parameter.d").Stack}} */
	function getWhenFromParent() {
		const fromParent = from.level.stack.parent;

		return (
			fromParent === to
			&&
			{
				direction: "above",
				mutualStack: fromParent.items,
			}
		);
	}
};

function getDirectionFromVector(
	vector,
) {
	/* istanbul ignore else: error is only thrown when there is gap in the implementation */
	if (vector < 0)
		return "above";
	else if (vector > 0)
		return "below";
	else
		throw new Error(`Unexpected vector of "${vector}".`);
}