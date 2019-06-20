module.exports =
	stack => {
		return whenSingleLevel() || stack;

		function whenSingleLevel() {
			return (
				stack.length === 1
				&&
				getLevelOrSingleItem(stack[0])
			);
		}
	};

function getLevelOrSingleItem(
	level,
) {
	return whenSingleItem() || level;

	function whenSingleItem() {
		return (
			level.length === 1
			&&
			level[0]
		);
	}
}