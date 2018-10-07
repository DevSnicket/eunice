const
	appendToOrCreateStack = require("./appendToOrCreateStack"),
	createNewLevelMap = require("./createNewLevelMap");

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
				appendToOrCreateStack({
					...createNewLevelMap(identifiersToStack),
					levelOrStack: identifierOrItemOrLevelOrStack,
				})
			);
		}
	};