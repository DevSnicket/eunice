const
	createLevelMap = require("./createLevelMap"),
	createOrAddToStack = require("./createOrAddToStack");

module.exports =
	({
		addMissing = false,
		identifierOrItemOrLevelOrStack,
		identifiersInNewStack,
	}) => {
		return (
			whenNewStack()
			||
			identifierOrItemOrLevelOrStack
		);

		function whenNewStack() {
			return (
				identifiersInNewStack
				&&
				(whenHasValue() || (addMissing && identifiersInNewStack))
			);
		}

		function whenHasValue() {
			return (
				identifierOrItemOrLevelOrStack
				&&
				createOrAddToStack({
					...createLevelMap({
						addMissing,
						identifiersInNewStack,
					}),
					levelOrStack:
						getOrCreateLevelOrStack(),
				})
			);
		}

		function getOrCreateLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				?
				identifierOrItemOrLevelOrStack
				:
				[ identifierOrItemOrLevelOrStack ]
			);
		}
	};