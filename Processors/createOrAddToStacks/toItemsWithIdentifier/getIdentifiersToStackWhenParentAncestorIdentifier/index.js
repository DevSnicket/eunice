module.exports =
	({
		ancestors,
		identifiersToStack,
		parentIdentifier,
	}) => {
		return (
			hasParentWithIdentifier()
			?
			identifiersToStack
			:
			null
		);

		function hasParentWithIdentifier(
		) {
			return (
				ancestors.length
				&&
				getParent().id === parentIdentifier
			);
		}

		function getParent() {
			return ancestors[ancestors.length - 1];
		}
	};