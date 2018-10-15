const
	createNewLevelMap = require("./createNewLevelMap"),
	createOrAddToStack = require("./createOrAddToStack");

module.exports =
	({
		identifierOrItemOrLevelOrStack,
		identifiersToStack,
	}) => {
		return (
			stackWhenLevelOrStack()
			||
			identifierOrItemOrLevelOrStack
		);

		function stackWhenLevelOrStack() {
			return (
				identifiersToStack
				&&
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				createOrAddToStack({
					...createNewLevelMap(identifiersToStack),
					levelOrStack: identifierOrItemOrLevelOrStack,
				})
			);
		}
	};