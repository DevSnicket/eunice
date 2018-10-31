const
	aggregateGroupFactoriesWithOrientation = require("./aggregateGroupFactoriesWithOrientation"),
	countDependenciesOfItem = require("./countDependenciesOfItem"),
	createArrows = require("./createArrows"),
	createDependencyGroupFactoryWhenRequired = require("./createDependencyGroupFactoryWhenRequired"),
	createOuterDependencyGroupFactory = require("./createOuterDependencyGroupFactory"),
	createParentGroupFactory = require("./createParentGroupFactory"),
	{ createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure"),
	createStackWithSummaryGroupFactory = require("./createStackWithSummaryGroupFactory"),
	createSvgElement = require("./createSvgElement"),
	createTextGroup = require("./createTextGroup"),
	findStackOfSubsetIdentifierHierarchyOrThrowError = require("./findStackOfSubsetIdentifierHierarchyOrThrowError"),
	getDependencyCountInBothDirections = require("./getDependencyCountInBothDirections"),
	sumDependencyCount = require("./sumDependencyCount"),
	withPrecision = require("./withPrecision");

module.exports =
	({
		createElement,
		createItemGroupWrapperForItem = ({ itemGroup }) => itemGroup,
		getTextWidth,
		namespaces = null,
		style = "",
		subsetIdentifierHierarchy,
		yaml,
	}) => {
		const
			arrows =
				createArrows({ createElement, withPrecision }),
			font =
				createFont({
					family: "arial",
					getTextWidth,
					size: 16,
				});

		return (
			createSvgElement({
				childGroupFactory:
					yaml
					&&
					initaliseAndCreateChildGroupFactory(),
				createElement,
				font,
				namespaces,
				style: `g.anonymous>text{font-style:italic}g.parent>rect{fill:none;stroke:gray}g.item>rect{fill:lightgray}g.item>text{text-anchor:middle}g.dependency>text{fill:white;text-anchor:middle}${style}`,
				symbols:
					Object.values(arrows)
					.map(arrow => arrow.element),
				withPrecision,
			})
		);

		function initaliseAndCreateChildGroupFactory() {
			const stack = createStackFromYaml(yaml);

			return (
				subsetIdentifierHierarchy
				?
				createParentGroupFactoryFromSubsetIdentifierHierarchy()
				:
				createGroupFactoryForStack(stack)
			);

			function createParentGroupFactoryFromSubsetIdentifierHierarchy() {
				const stackOfSubsetIdentifierHierarchy =
					findStackOfSubsetIdentifierHierarchyOrThrowError({
						stack,
						subsetIdentifierHierarchy,
					});

				return (
					createOuterDependencyGroupFactory({
						aggregateGroupFactoriesWithOrientation,
						createGroupFactoryWhenRequired:
							createParentOuterDependencyGroupFactoryWhenRequired,
						dependencyCount:
							getParentDependencyCount(),
						itemGroupFactory:
							createParentAndStackGroupFactory(),
					})
				);

				function createParentOuterDependencyGroupFactoryWhenRequired({
					arrow,
					count,
					keySuffix,
				}) {
					return (
						createDependencyGroupFactoryWhenRequired({
							arrow,
							count,
							createTextGroup:
								createTextGroupWithFontSizeAndPrecision,
							font,
							key:
								`${stackOfSubsetIdentifierHierarchy.parent.id} dependency count outer ${keySuffix}`,
						})
					);
				}

				function getParentDependencyCount() {
					return (
						getDependencyCountInBothDirections({
							arrows,
							dependencyCount:
								countDependenciesOfItem({
									item:
										stackOfSubsetIdentifierHierarchy.parent,
									parentStack:
										stackOfSubsetIdentifierHierarchy.parent.level.stack,
									sumCount:
										sumDependencyCount,
								}),
						})
					);
				}

				function createParentAndStackGroupFactory() {
					return (
						createParentGroupFactory({
							childGroupFactory:
								createGroupFactoryForStack(
									stackOfSubsetIdentifierHierarchy,
								),
							createTextGroup:
								createTextGroupWithFontSizeAndPrecision,
							getTextWidth:
								font.measure,
							identifier:
								stackOfSubsetIdentifierHierarchy.parent.id,
						})
					);
				}
			}
		}

		function createGroupFactoryForStack(
			stack,
		) {
			return (
				createStackWithSummaryGroupFactory({
					aggregateGroupFactoriesWithOrientation,
					arrows,
					countDependenciesOfItem,
					createDependencyGroupFactoryWhenRequired,
					createItemGroupWrapperForItem,
					createOuterDependencyGroupFactory,
					createTextGroup: createTextGroupWithFontSizeAndPrecision,
					font,
					getDependencyCountInBothDirections,
					stack,
					sumDependencyCount,
				})
			);
		}

		function createTextGroupWithFontSizeAndPrecision(
			parameters,
		) {
			return (
				createTextGroup({
					createElement,
					fontSize: font.size,
					withPrecision,
					...parameters,
				})
			);
		}
	};

function createFont({
	family,
	getTextWidth,
	size,
}) {
	const getTextWidthOptions = { font: family, size };

	return (
		{
			family,
			measure: text => withPrecision(getTextWidth(text, getTextWidthOptions)),
			size,
		}
	);
}