// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import aggregateGroupFactoriesWithOrientation from "../aggregateGroupFactoriesWithOrientation";
import countDependenciesOfItem from "../countDependenciesOfItem";
import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createOuterDependencyGroupFactory from "../createOuterDependencyGroupFactory";
import createParentGroupFactory from "./createParentGroupFactory";
import findItemInStackWithIdentifierHierarchy from "@devsnicket/eunice-dependency-and-structure/findItemInStackWithIdentifierHierarchy";
import getDependencyCountInBothDirections from "../getDependencyCountInBothDirections";
import sumDependencyCount from "../sumDependencyCount";

export default ({
	arrows,
	createGroupFactoryForStack,
	createTextGroup,
	font,
	stack,
	subsetIdentifierHierarchy,
}) =>
	createOuterDependencyGroupFactory({
		aggregateGroupFactoriesWithOrientation,
		...withSubsetStack({
			arrows,
			createGroupFactoryForStack,
			createTextGroup,
			font,
			stack:
				findStackOfSubsetIdentifierHierarchyOrThrowError({
					stack,
					subsetIdentifierHierarchy,
				}),
		}),
	});

function withSubsetStack({
	arrows,
	createGroupFactoryForStack,
	createTextGroup,
	font,
	stack,
}) {
	return (
		{
			createGroupFactoryWhenRequired:
				createParentOuterDependencyGroupFactoryWhenRequired,
			dependencyCount:
				getParentDependencyCount(),
			itemGroupFactory:
				createParentAndStackGroupFactory(),
		}
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
					`${stack.parent.id} dependency count outer ${keys.relationship} ${keys.structure}`,
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
							stack.parent,
						parentStack:
							stack.parent.level.stack,
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
						stack,
					),
				createTextGroup,
				getTextWidth:
					font.measure,
				identifier:
					stack.parent.id,
			})
		);
	}
}

function findStackOfSubsetIdentifierHierarchyOrThrowError({
	stack,
	subsetIdentifierHierarchy,
}) {
	const item =
		findItemInStackWithIdentifierHierarchy({
			identifierHierarchy: subsetIdentifierHierarchy,
			stack,
		});

	if (item.items)
		return item.items;
	else
		throw new Error(`Final item of subset identifier hierarchy "${subsetIdentifierHierarchy.join("->")}" has no child items.`);
}