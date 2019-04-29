const
	{ createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure"),
	createSubsetSelection = require("./createSubsetSelection"),
	{ getSvgElementForStack } = require("@devsnicket/eunice-renderer"),
	getTextWidth = require("string-pixel-width"),
	locationHashOfKeyValue = require("./locationHashOfKeyValue"),
	parseYaml = require("js-yaml").safeLoad;

module.exports =
	({
		createElement,
		locationHash,
		yaml,
	}) => {
		const
			stack =
				yaml
				&&
				createStackFromYaml(parseYaml(yaml)),
			subsetSelection =
				createSubsetSelection({
					createElement,
					getHrefWithKeysAndValues,
					getValueOfKey,
				});

		return createBreadcrumbAndSvgElement();

		function getValueOfKey(
			key,
		) {
			return (
				locationHashOfKeyValue.getValue({
					key,
					locationHash,
				})
			);
		}

		function createBreadcrumbAndSvgElement() {
			return (
				createElement(
					"div",
					{ style: { padding: "0.5em" } },
					subsetSelection.createBreadcrumbElement(),
					getSvgElementForStack({
						createElement,
						elementContainerFactory:
							createElementContainerFactory(),
						getTextWidth,
						namespaces:
							{ xmlnsXlink: "http://www.w3.org/1999/xlink" },
						stack,
						style:
							"a{cursor:pointer}",
						subsetIdentifierHierarchy:
							subsetSelection.identifierHierarchy,
					}),
				)
			);
		}

		function createElementContainerFactory() {
			return { createForItem: createElementContainerForItem };

			function createElementContainerForItem({
				element,
				item,
			}) {
				return (
					subsetSelection.createContainerForItemElement({
						element,
						item,
					})
				);
			}
		}

		function getHrefWithKeysAndValues(
			keysAndValues,
		) {
			return (
				locationHashOfKeyValue.getWithKeysAndValues({
					keysAndValues,
					locationHash,
				})
			);
		}
	};