const
	aggregateGroupFactoriesWithOrientation = require("../aggregateGroupFactoriesWithOrientation"),
	countDependenciesOfItem = require("../countDependenciesOfItem"),
	createDependencyGroupFactoryWhenRequired = require("../createDependencyGroupFactoryWhenRequired"),
	createOuterDependencyGroupFactory = require("../createOuterDependencyGroupFactory"),
	createParentGroupFactory = require("./createParentGroupFactory"),
	findStackOfSubsetIdentifierHierarchyOrThrowError = require("./findStackOfSubsetIdentifierHierarchyOrThrowError"),
	getDependencyCountInBothDirections = require("../getDependencyCountInBothDirections"),
	sumDependencyCount = require("../sumDependencyCount");

module.exports =
	({
		arrows,
		createGroupFactoryForStack,
		createTextGroup,
		font,
		stack,
		subsetIdentifierHierarchy,
	}) => {
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
			keys,
		}) {
			return (
				createDependencyGroupFactoryWhenRequired({
					arrow,
					count,
					createTextGroup,
					font,
					key:
						`${stackOfSubsetIdentifierHierarchy.parent.id} dependency count outer ${keys.relationship} ${keys.structure}`,
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
					createTextGroup,
					getTextWidth:
						font.measure,
					identifier:
						stackOfSubsetIdentifierHierarchy.parent.id,
				})
			);
		}
	};