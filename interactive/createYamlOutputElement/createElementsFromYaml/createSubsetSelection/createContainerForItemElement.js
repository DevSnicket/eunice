module.exports =
	({
		createElement,
		element,
		getHrefWithIdentifierHierarchy,
		item,
		subsetIdentifierHierarchy,
	}) => {
		return (
			item.items
			?
			createElement(
				"a",
				{
					key:
						item.id,
					xlinkHref:
						getHrefWithIdentifierHierarchy(
							getIdentifierHierarchy(),
						),
				},
				element,
			)
			:
			element
		);

		function getIdentifierHierarchy() {
			return (
				[
					...subsetIdentifierHierarchy || [],
					item.id,
				]
			);
		}
	};