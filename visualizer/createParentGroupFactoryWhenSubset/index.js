// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createOuterDependencyGroupFactory from "../createOuterDependencyGroupFactory";
import createParentGroupFactory from "./createParentGroupFactory";
import findItemInStackWithIdentifierHierarchy from "@devsnicket/eunice-dependency-and-structure/findItemInStackWithIdentifierHierarchy";

export default ({
	arrows,
	createGroupFactoryForStack,
	createTextGroup,
	font,
	stack,
	subsetIdentifierHierarchy,
}) =>
	subsetIdentifierHierarchy
	&&
	createOuterDependencyGroupFactory({
		arrows,
		...withSubsetStack({
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
				stack.parent.dependencyCount,
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