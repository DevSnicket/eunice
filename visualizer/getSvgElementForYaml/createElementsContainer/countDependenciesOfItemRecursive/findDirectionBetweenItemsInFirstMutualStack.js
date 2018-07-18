module.exports = findDirectionBetweenItemsInFirstMutualStack;

function findDirectionBetweenItemsInFirstMutualStack({
	from,
	to,
}) {
	return (
		isSame()
		||
		getWhenSameLevel()
		||
		getWhenSameStack()
		||
		findInParents()
	);

	function isSame() {
		return (
			from === to
		);
	}

	function getWhenSameLevel() {
		return (
			from.level === to.level
			&&
			{
				direction: 0,
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
	}

	function getForStack(
		stack
	) {
		return (
			{
				direction: stack.indexOf(to.level) - stack.indexOf(from.level),
				stack,
			}
		);
	}

	function findInParents() {
		const
			fromParent = from.level.stack.parent,
			toParent = to.level.stack.parent;

		return (
			getWhenToParent()
			||
			getWhenFromParent()
			||
			findInParentOfFrom()
			||
			findInParentOfTo()
		);

		function getWhenToParent() {
			return (
				from === toParent
				&&
				{
					direction: 1,
					stack: toParent.items,
				}
			);
		}

		function getWhenFromParent() {
			return (
				fromParent === to
				&&
				{
					direction: -1,
					stack: fromParent.items,
				}
			);
		}

		function findInParentOfFrom() {
			return (
				fromParent
				&&
				findDirectionBetweenItemsInFirstMutualStack({
					from: fromParent,
					to,
				})
			);
		}

		function findInParentOfTo() {
			return (
				toParent
				&&
				findDirectionBetweenItemsInFirstMutualStack({
					from,
					to: toParent,
				})
			);
		}
	}
}