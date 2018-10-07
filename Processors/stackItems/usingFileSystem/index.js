const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	fs = require("fs"),
	parseYaml = require("js-yaml").safeLoad,
	path = require("path"),
	stackItems = require("../");

callWithYamlItemsAndOutputWhenProcessEntryPoint(stackFromFileSystem);

module.exports = stackFromFileSystem;

function stackFromFileSystem({
	directory,
	items,
}) {
	return (
		items
		&&
		withDirectory(
			directory,
		)
		.getIdentifierOrStackItemOrItems(
			items,
		)
	);
}

function withDirectory(
	directory,
) {
	return { getIdentifierOrStackItemOrItems };

	function getIdentifierOrStackItemOrItems(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			stackWhenLevel()
			||
			getIdentifierOrStackItemsWhenItem(identifierOrItemOrLevelOrStack)
		);

		function stackWhenLevel() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				stackItemsUsingFileIn(
					identifierOrItemOrLevelOrStack,
				)
			);
		}
	}

	function stackItemsUsingFileIn(
		items,
	) {
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
						directory,
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
					withDirectory(
						path.join(directory, item.id),
					)
					.getIdentifierOrStackItemOrItems(
						item.items,
					)
				);
			}
		}
	}
}