/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	aggregateGroupFactoriesWithOrientation = require("../aggregateGroupFactoriesWithOrientation"),
	countDependenciesOfItem = require("../countDependenciesOfItem"),
	createDependencyGroupFactoryWhenRequired = require("../createDependencyGroupFactoryWhenRequired"),
	createOuterDependencyGroupFactory = require("../createOuterDependencyGroupFactory"),
	createParentGroupFactory = require("./createParentGroupFactory"),
	findItemInStackWithIdentifierHierarchy = require("@devsnicket/eunice-dependency-and-structure/findItemInStackWithIdentifierHierarchy"),
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