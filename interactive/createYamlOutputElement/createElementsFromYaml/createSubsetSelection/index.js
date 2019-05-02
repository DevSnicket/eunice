const
	createBreadcrumbElement = require("./createBreadcrumbElement"),
	createContainerForItemElement = require("./createContainerForItemElement"),
	createIdentifierAnchor = require("./createIdentifierAnchor"),
	identifierHierarchyArgument = require("./identifierHierarchyArgument");

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
				createAncestorSeparatorElement,
				createBreadcrumbElement:
					() =>
						createBreadcrumbElement({
							createAncestorSeparatorElement,
							createElement,
							createItemAnchor,
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
				createItemAnchor,
				identifierHierarchy:
					subsetIdentifierHierarchy,
			}
		);

		function createAncestorSeparatorElement() {
			return (
				createElement(
					"span",
					{ className: "ancestor-separator" },
					"\u2013",
				)
			);
		}

		function createItemAnchor({
			identifier,
			identifierHierarchy,
		}) {
			return (
				createIdentifierAnchor({
					createElement,
					href: getHrefWithIdentifierHierarchy(identifierHierarchy),
					identifier,
				})
			);
		}

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