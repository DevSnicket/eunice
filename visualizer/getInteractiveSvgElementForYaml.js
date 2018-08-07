const
	{ createElement } = require("react"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad;

const
	callOrCreateErrorElement = require("./getInteractiveSvgElementForYaml/callOrCreateErrorElement"),
	getSvgElementForYaml = require("./getSvgElementForYaml");

module.exports =
	({
		locationHash,
		yaml,
	}) => {
		return (
			callOrCreateErrorElement(
				() =>
					getSvgElementForYaml({
						createElement,
						createItemGroupWrapperForItem,
						getTextWidth,
						namespaces:
							{ xmlnsXlink: "http://www.w3.org/1999/xlink" },
						style:
							"a{cursor:pointer}",
						subsetIdentifierHierarchy:
							getSubsetIdentifierHierarchy(),
						yaml:
							parseYaml(yaml),
					})
			)
		);

		function getSubsetIdentifierHierarchy() {
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
						decodeURIComponent(identifier)
				)
			);
		}

		function createItemGroupWrapperForItem({
			item,
			itemGroup,
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
							xlinkHref: getHashBase() + encodeURIComponent(item.id),
						},
						itemGroup
					)
				);
			}
		}

		function getHashBase() {
			return (
				locationHash
				?
				`${locationHash}/`
				:
				"#"
			);
		}
	};