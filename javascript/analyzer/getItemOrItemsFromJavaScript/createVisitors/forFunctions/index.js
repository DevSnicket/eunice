/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	addFunctionExpression = require("./addFunctionExpression"),
	createFunctionDeclaration = require("./createFunctionDeclaration"),
	{ findIdentifiableParent } = require("../parentFunctionsFromAncestors");

module.exports =
	({
		createDependsUponPropertyFor,
		declarations,
		hasUndeclaredReferenceTo,
	}) => {
		return (
			{
				ArrowFunctionExpression: visitFunctionExpression,
				FunctionDeclaration: visitFunctionDeclaration,
				FunctionExpression: visitFunctionExpression,
			}
		);
		function visitFunctionDeclaration(
			functionDeclaration,
			ancestors,
		) {
			declarations.addDeclarationIn({
				declaration:
					createFunctionDeclarationWithIdentifier({
						functionDeclaration,
						identifier:
							functionDeclaration.id
							&&
							functionDeclaration.id.name,
					}),
				parent:
					findIdentifiableParent(ancestors),
			});
		}

		function visitFunctionExpression(
			functionExpression,
			ancestors,
		) {
			addFunctionExpression({
				addDeclarationIn:
					declarations.addDeclarationIn,
				ancestors,
				createFunctionDeclarationWithIdentifier,
				findParentFunctionFromAncestors:
					findIdentifiableParent,
				functionExpression,
			});
		}

		function createFunctionDeclarationWithIdentifier({
			functionDeclaration,
			identifier,
		}) {
			return (
				createFunctionDeclaration({
					dependsUponProperty:
						createDependsUponPropertyFor(
							functionDeclaration,
						),
					functionDeclaration,
					hasUndeclaredReferenceTo,
					identifier,
					items:
						declarations.createItemsForAndRemoveDeclarationsIn(
							functionDeclaration,
						),
				})
			);
		}
	};