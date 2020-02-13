// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
/**
  * @param {Object} parameter
  * @param {import("./Parameter.d").Item} parameter.from
  * @param {import("./Parameter.d").Item} parameter.to
  * @returns {{direction: "above"|"below"|"same"|"self", stack: import("./Parameter.d").Stack}}
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

	/** @returns {{direction: "self", stack: import("./Parameter.d").Stack}} */
	function getWhenSame() {
		return (
			from === to
			&&
			{
				direction: "self",
				stack: from.level.stack,
			}
		);
	}

	/** @returns {{direction: "same", stack: import("./Parameter.d").Stack}} */
	function getWhenSameLevel() {
		return (
			from.level === to.level
			&&
			{
				direction: "same",
				stack: from.level.stack,
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
		  * @param {import("./Parameter.d").Items & import("./Parameter.d").Stack} stack
		  * @returns {{direction: "above"|"below", stack: import("./Parameter.d").Stack}}
		  */
		function getForStack(
			stack,
		) {
			return (
				{
					direction:
						getDirectionFromVector(
							getStackIndexOfItem(to)
							-
							getStackIndexOfItem(from),
						),
					stack,
				}
			);

			function getStackIndexOfItem(
				{ level },
			) {
				return stack.indexOf(level);
			}
		}
	}

	/** @returns {{direction: "below", stack: import("./Parameter.d").Stack}} */
	function getWhenToParent() {
		const toParent = to.level.stack.parent;

		return (
			from === toParent
			&&
			{
				direction: "below",
				stack: toParent.items,
			}
		);
	}

	/** @returns {{direction: "above", stack: import("./Parameter.d").Stack}} */
	function getWhenFromParent() {
		const fromParent = from.level.stack.parent;

		return (
			fromParent === to
			&&
			{
				direction: "above",
				stack: fromParent.items,
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