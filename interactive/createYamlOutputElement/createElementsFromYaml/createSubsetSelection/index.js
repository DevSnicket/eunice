const
	createBreadcrumbElement = require("./createBreadcrumbElement"),
	createContainerForItemElement = require("./createContainerForItemElement"),
	identifierHierarchyArgument = require("../identifierHierarchyArgument");

module.exports =
	({
		createElement,
		getHrefWithKeysAndValues,
		getValueOfKey,
	}) => {
		const subsetIdentifierHierarchy =
			splitIdentifierHierarchy(
				getValueOfKey(key),
			);

		return (
			{
				createBreadcrumbElement:
					() =>
						createBreadcrumbElement({
							createElement,
							getHrefWithIdentifierHierarchy,
							subsetIdentifierHierarchy,
						}),
				createContainerForItemElement:
					({
						element,
						item,
					}) =>
						createContainerForItemElement({
							createElement,
							element,
							getHrefWithIdentifierHierarchy,
							item,
							subsetIdentifierHierarchy,
						}),
				identifierHierarchy:
					subsetIdentifierHierarchy,
			}
		);

		function getHrefWithIdentifierHierarchy(
			identifierHierarchy,
		) {
			return (
				getHrefWithKeysAndValues(
					[
						{
							key,
							value:
								identifierHierarchyArgument.format(
									identifierHierarchy,
								),
						},
					],
				)
			);
		}
	};

function splitIdentifierHierarchy(
	identifierHierarchy,
) {
	return (
		identifierHierarchy
		&&
		identifierHierarchyArgument.parse(identifierHierarchy)
	);
}

const key = "subset-item";