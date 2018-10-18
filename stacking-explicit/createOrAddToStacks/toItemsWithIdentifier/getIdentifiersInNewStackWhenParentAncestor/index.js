module.exports =
	({
		ancestors,
		identifiersInNewStack,
		parentIdentifier,
	}) => {
		return (
			hasParentWithIdentifier()
			?
			identifiersInNewStack
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