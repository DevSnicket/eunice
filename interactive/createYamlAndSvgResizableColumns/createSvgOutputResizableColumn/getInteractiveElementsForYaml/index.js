const
	createBreadcrumbElementFromSubsetIdentifierHierarchy = require("./createBreadcrumbElementFromSubsetIdentifierHierarchy"),
	{ createElement } = require("react"),
	{ getSvgElementForYaml } = require("@devsnicket/eunice-renderer"),
	getTextWidth = require("string-pixel-width"),
	locationHashOfKeyValue = require("./locationHashOfKeyValue"),
	parseYaml = require("js-yaml").safeLoad;

module.exports =
	({
		locationHash,
		yaml,
	}) => {
		const subsetIdentifierHierarchy =
			splitSubsetIdentifierHierarchy(
				locationHashOfKeyValue.getValue({
					key: selectedItemParameterName,
					locationHash,
				}),
			);

		return (
			[
				createBreadcrumbElementFromSubsetIdentifierHierarchy({
					createElement,
					subsetIdentifierHierarchy,
				}),
				getSvgElementForYaml({
					createElement,
					getTextWidth,
					groupContainerFactory:
						createGroupContainerFactory(),
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

		function createGroupContainerFactory() {
			return (
				{
					createForItem:
						({ group, item }) =>
							createGroupContainerForItem({
								group,
								item,
								locationHash,
								subsetIdentifierHierarchy,
							}),
				}
			);
		}
	};

function splitSubsetIdentifierHierarchy(
	subsetIdentifierHierarchy,
) {
	return (
		subsetIdentifierHierarchy
		&&
		subsetIdentifierHierarchy
		.split(subsetIdentifierSeparator)
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

function createGroupContainerForItem({
	group,
	item,
	locationHash,
	subsetIdentifierHierarchy,
}) {
	return (
		item.items
		?
		createElement(
			"a",
			{
				key: item.id,
				xlinkHref: getHref(),
			},
			group,
		)
		:
		group
	);

	function getHref() {
		return (
			locationHashOfKeyValue.getWithKeysAndValues({
				keysAndValues:
					[
						{
							key:
								selectedItemParameterName,
							value:
								getValue(),
						},
					],
				locationHash,
			})
		);

		function getValue() {
			return (
				[
					...subsetIdentifierHierarchy || [],
					item.id,
				]
				.join(subsetIdentifierSeparator)
			);
		}
	}
}

const
	selectedItemParameterName = "selected",
	subsetIdentifierSeparator = "/";