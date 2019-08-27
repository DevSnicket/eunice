// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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