module.exports =
	({
		ancestors,
		identifiersInNewStack,
		parentIdentifierPattern,
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
				isParentIdentifierMatch(
					getParentIdentifier(),
				)
			);
		}

		function getParentIdentifier() {
			return (
				ancestors.length
				&&
				ancestors[ancestors.length - 1].id
			);
		}

		function isParentIdentifierMatch(
			identifier,
		) {
			return (
				identifier
				&&
				identifier.match(parentIdentifierPattern)
			);
		}
	};