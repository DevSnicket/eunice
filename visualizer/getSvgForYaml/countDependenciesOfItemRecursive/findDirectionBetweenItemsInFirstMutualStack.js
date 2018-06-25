module.exports = findDirectionBetweenItemsInFirstMutualStack;

function findDirectionBetweenItemsInFirstMutualStack({
	from,
	to,
}) {
	return (
		getWhenSame()
		||
		getWhenSameLevel()
		||
		getWhenSameStack()
		||
		findInParents()
	);

	function getWhenSame() {
		return (
			from === to
			?
			{
				direction: 0,
				stack: from.items,
			}
			:
			null
		);
	}

	function getWhenSameLevel() {
		return (
			from.level === to.level
			?
			{
				direction: 0,
				stack: from.level.stack,
			}
			:
			null
		);
	}

	function getWhenSameStack() {
		return (
			from.level.stack === to.level.stack
			?
			getForStack(from.level.stack)
			:
			null
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
			fromParent = from.level.stack.item,
			toParent = to.level.stack.item;

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
				?
				{
					direction: 1,
					stack: toParent.items,
				}
				:
				null
			);
		}

		function getWhenFromParent() {
			return (
				fromParent === to
				?
				{
					direction: -1,
					stack: fromParent.items,
				}
				:
				null
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