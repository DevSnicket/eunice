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
					createForDependencyCount:
						({ group, item, relationship, structure }) =>
							createGroupContainerForDependencyCount({
								group,
								item,
								locationHash,
								relationship,
								structure,
							}),
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

function createGroupContainerForDependencyCount({
	group,
	item,
	locationHash,
	relationship,
	structure,
}) {
	return (
		createElement(
			"a",
			{
				xlinkHref:
					locationHashOfKeyValue.getWithKeysAndValues({
						keysAndValues:
							[
								{
									key: "list-dependencies-item",
									value: item.id,
								},
								{
									key: "list-dependencies-relationship",
									value: relationship,
								},
								{
									key: "list-dependencies-structure",
									value: structure,
								},
							],
						locationHash,
					}),
			},
			group,
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