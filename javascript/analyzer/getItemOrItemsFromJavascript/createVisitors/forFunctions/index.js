/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	addFunctionExpression = require("./addFunctionExpression"),
	createDeclarationForFunction = require("./createDeclarationForFunction"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors"),
	getParentFromAncestors = require("../getParentFromAncestors");

module.exports =
	({
		createDependsUponPropertyForParent,
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
					createDeclarationForFunctionWithDependsUponAndItems({
						functionDeclarationOrExpression:
							functionDeclaration,
						identifier:
							functionDeclaration.id
							&&
							functionDeclaration.id.name,
						type:
							isExport() && "export",
					}),
				parent:
				findBlockOrIdentifiableParent(ancestors),
			});

			function isExport() {
				const parentType = getParentFromAncestors(ancestors).type;

				return (
					parentType === "ExportDefaultDeclaration"
					||
					parentType === "ExportNamedDeclaration"
				);
			}
		}

		function visitFunctionExpression(
			functionExpression,
			ancestors,
		) {
			addFunctionExpression({
				addDeclarationIn:
					declarations.addDeclarationIn,
				ancestors,
				createDeclarationForFunction:
					createDeclarationForFunctionWithDependsUponAndItems,
				findParentFunctionFromAncestors:
					findBlockOrIdentifiableParent,
				functionExpression,
			});
		}

		function createDeclarationForFunctionWithDependsUponAndItems({
			functionDeclarationOrExpression,
			identifier,
			type,
		}) {
			return (
				createDeclarationForFunction({
					dependsUponProperty:
						createDependsUponPropertyForParent(
							{ parent: functionDeclarationOrExpression },
						),
					functionDeclarationOrExpression,
					hasUndeclaredReferenceTo,
					identifier,
					items:
						declarations.createItemsForAndRemoveDeclarationsIn(
							functionDeclarationOrExpression,
						),
					type,
				})
			);
		}
	};