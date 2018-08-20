module.exports =
	({
		from,
		to,
	}) => {
		return (
			isSame()
			||
			getWhenSameLevel()
			||
			getWhenSameStack()
			||
			getWhenToParent()
			||
			getWhenFromParent()
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

		function getWhenToParent() {
			const toParent = to.level.stack.parent;

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
			const fromParent = from.level.stack.parent;

			return (
				fromParent === to
				&&
				{
					direction: -1,
					stack: fromParent.items,
				}
			);
		}
	};