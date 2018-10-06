const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	fs = require("fs"),
	parseYaml = require("js-yaml").safeLoad,
	path = require("path"),
	stackItems = require("../");

callWithYamlItemsAndOutputWhenProcessEntryPoint(stackFromFileSystem);

module.exports = stackFromFileSystem;

function stackFromFileSystem({
	items,
	rootDirectory,
}) {
	return (
		items
		&&
		withDirectory(
			rootDirectory,
		)
		.getIdentifierOrStackItemOrItems({
			identifierOrItemOrItems: items,
			relativeDirectory: null,
		})
	);
}

function withDirectory(
	rootDirectory,
) {
	return { getIdentifierOrStackItemOrItems };

	function getIdentifierOrStackItemOrItems({
		identifierOrItemOrItems,
		relativeDirectory,
	}) {
		return (
			stackWhenLevel()
			||
			getIdentifierOrStackItemsWhenItem(identifierOrItemOrItems)
		);

		function stackWhenLevel() {
			return (
				Array.isArray(identifierOrItemOrItems)
				&&
				stackItemsUsingFileIn({
					items: identifierOrItemOrItems,
					relativeDirectory,
				})
			);
		}
	}

	function stackItemsUsingFileIn({
		items,
		relativeDirectory,
	}) {
		return (
			(stackWhenFileExists() || items)
			.map(getIdentifierOrStackItemsWhenItemOrLevel)
		);

		function stackWhenFileExists() {
			const stackFilePath = getStackFilePath();

			return (
				fs.existsSync(stackFilePath)
				&&
				stackItems({
					identifierStack: readStack(),
					items,
				})
			);

			function getStackFilePath() {
				return (
					path.join(
						rootDirectory,
						...relativeDirectory ? [ relativeDirectory ] : [],
						".devsnicket.eunice.stack.yaml",
					)
				);
			}

			function readStack() {
				return (
					parseYaml(
						fs.readFileSync(
							stackFilePath,
							"utf-8",
						),
					)
				);
			}
		}
	}

	function getIdentifierOrStackItemsWhenItemOrLevel(
		identifierOrItemOrLevel,
	) {
		return (
			Array.isArray(identifierOrItemOrLevel)
			?
			identifierOrItemOrLevel.map(getIdentifierOrStackItemsWhenItem)
			:
			getIdentifierOrStackItemsWhenItem(identifierOrItemOrLevel)
		);
	}

	function getIdentifierOrStackItemsWhenItem(
		identifierOrItem,
	) {
		return (
			getWhenIdentifier()
			||
			stackItemsOfItem(identifierOrItem)
		);

		function getWhenIdentifier() {
			return (
				typeof identifierOrItem === "string"
				&&
				identifierOrItem
			);
		}
	}

	function stackItemsOfItem(
		item,
	) {
		return (
			{
				...item,
				...getItemsPropertyStackedWhenItemIdentifiable(),
			}
		);

		function getItemsPropertyStackedWhenItemIdentifiable() {
			return (
				item.id
				&&
				item.items
				&&
				{ items: stackItemsWithIdentifierAsRelativeDirectory() }
			);

			function stackItemsWithIdentifierAsRelativeDirectory() {
				return (
					getIdentifierOrStackItemOrItems({
						identifierOrItemOrItems: item.items,
						relativeDirectory: item.id,
					})
				);
			}
		}
	}
}