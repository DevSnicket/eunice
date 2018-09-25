const
	{ createElement } = require("react"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad;

const
	createBreadcrumbElementFromSubsetIdentifierHierarchy = require("./createBreadcrumbElementFromSubsetIdentifierHierarchy"),
	getSvgElementForYaml = require("../getSvgElementForYaml");

module.exports =
	({
		locationHash,
		yaml,
	}) => {
		const subsetIdentifierHierarchy =
			getSubsetIdentifierHierarchyFromLocationHash(
				locationHash,
			);

		return (
			[
				createBreadcrumbElementFromSubsetIdentifierHierarchy({
					createElement,
					subsetIdentifierHierarchy,
				}),
				getSvgElementForYaml({
					createElement,
					createItemGroupWrapperForItem:
						({ item, itemGroup }) =>
							createItemGroupWrapperForItem({ item, itemGroup, locationHash }),
					getTextWidth,
					namespaces:
						{ xmlnsXlink: "http://www.w3.org/1999/xlink" },
					style:
						"a{cursor:pointer}",
					subsetIdentifierHierarchy,
					yaml:
						parseYaml(yaml),
				}),
			]
		);
	};

function getSubsetIdentifierHierarchyFromLocationHash(
	locationHash,
) {
	return (
		locationHash
		&&
		locationHash
		.substring(1)
		.split("/")
		.map(
			identifier =>
				identifier === "undefined"
				?
				// the item id property wont be defined
				// eslint-disable-next-line no-undefined
				undefined
				:
				decodeURIComponent(identifier),
		)
	);
}

function createItemGroupWrapperForItem({
	item,
	itemGroup,
	locationHash,
}) {
	return (
		item.items
		?
		createAnchorWrapper()
		:
		itemGroup
	);

	function createAnchorWrapper() {
		return (
			createElement(
				"a",
				{
					key: item.id,
					xlinkHref: getHrefBase() + encodeURIComponent(item.id),
				},
				itemGroup,
			)
		);
	}

	function getHrefBase() {
		return (
			locationHash
			?
			`${locationHash}/`
			:
			"#"
		);
	}
}