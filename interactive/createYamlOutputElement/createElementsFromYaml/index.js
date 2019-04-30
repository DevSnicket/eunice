const
	{ createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure"),
	createSubsetSelection = require("./createSubsetSelection"),
	dependencyListElementFactory = require("./dependencyListElementFactory"),
	{ getSvgElementForStack } = require("@devsnicket/eunice-renderer"),
	getTextWidth = require("string-pixel-width"),
	locationHashOfKeyValue = require("./locationHashOfKeyValue"),
	parseYaml = require("js-yaml").safeLoad;

module.exports =
	({
		createElement,
		locationHash,
		resizableElementTypes,
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
					getHrefWithKeysAndValues:
						keysAndValues =>
							getHrefKeysAndValues(
								dependencyListElementFactory.clearFromKeysAndValues(
									keysAndValues,
								),
							),
					getValueOfKey,
				});

		return (
			createWithDependencyList(
				createBreadcrumbAndSvgElement(),
			)
		);

		function createWithDependencyList(
			element,
		) {
			return (
				dependencyListElementFactory.createWithDependencyList({
					createElement,
					element,
					getValueOfKey,
					resizableElementTypes,
					stack,
					subsetIdentifierHierarchy:
						subsetSelection.identifierHierarchy,
				})

			);
		}

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
			return (
				{
					createForDependencyCount: createElementContainerForDependencyCount,
					createForItem: createElementContainerForItem,
				}
			);

			function createElementContainerForDependencyCount({
				element,
				item,
				level,
				relationship,
			}) {
				return (
					dependencyListElementFactory.createForDependencyCount({
						createElement,
						element,
						getHrefKeysAndValues,
						identifier: item.id,
						level,
						relationship,
					})
				);
			}

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

		function getHrefKeysAndValues(
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