/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

const
	getNamesFromDestructureOrIdentifier = require("../getNamesFromDestructureOrIdentifier"),
	stackItemsWhenMultiple = require("../stackItemsWhenMultiple");

module.exports =
	({
		dependsUponProperty,
		functionDeclarationOrExpression,
		hasUndeclaredReferenceTo,
		identifier,
		items,
		type,
	}) => {
		const itemOrItems =
			stackItemsWhenMultiple({
				items:
					[
						...createParameterItemsForFunction({
							functionDeclarationOrExpression,
							hasUndeclaredReferenceTo,
						}),
						...items || [],
					],
				withSingleInArray:
					false,
			});

		return (
			{
				...identifier && { id: identifier },
				...type && { type },
				...dependsUponProperty,
				...itemOrItems && { items: itemOrItems },
			}
		);
	};

function createParameterItemsForFunction({
	functionDeclarationOrExpression,
	hasUndeclaredReferenceTo,
}) {
	return (
		functionDeclarationOrExpression.params
		.flatMap(
			getNamesFromDestructureOrIdentifier,
		)
		.filter(
			parameter =>
				hasUndeclaredReferenceTo({
					parent: functionDeclarationOrExpression,
					reference: parameter,
				}),
		)
		.map(
			parameter => (
				{
					id: parameter,
					type: "parameter",
				}
			),
		)
	);
}