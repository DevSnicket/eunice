/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

const
	createAndAddDeclarations = require("./createAndAddDeclarations"),
	getNamesFromIdentifierExpressionWhenObjectPattern = require("./getNamesFromIdentifierExpressionWhenObjectPattern");

module.exports =
	({
		addDeclarationsIn,
		addScopedVariables,
		hasUndeclaredReferenceTo,
		parent,
		parentFunction,
		variableDeclaration,
	}) => {
		if (isScoped())
			getAndAddScopedVariables();
		else
			createAndAddDeclarations({
				addDeclarationsIn,
				getNamesFromIdentifierExpressionWhenObjectPattern,
				hasUndeclaredReferenceTo,
				parentFunction,
				variableDeclaration,
			});

		function isScoped() {
			return (
				parentFunction
				&&
				parentFunction.body !== parent
			);
		}

		function getAndAddScopedVariables() {
			addScopedVariables({
				scope:
					parent,
				variables:
					variableDeclaration.declarations.flatMap(
						declaration =>
							getNamesFromIdentifierExpressionWhenObjectPattern(declaration.id)
							||
							[ declaration.id.name ],
					),
			});
		}
	};