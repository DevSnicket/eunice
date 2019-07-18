/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

const
	getPropertyName = require("./getPropertyName"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple");

module.exports =
	({
		dependsUponProperty,
		functionDeclaration,
		hasUndeclaredReferenceTo,
		identifier,
		items,
	}) => {
		const itemOrItems =
			stackItemsWhenMultiple({
				items:
					[
						...createParameterItemsForFunction({
							functionDeclaration,
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
				isFunction: true,
				...dependsUponProperty,
				...itemOrItems && { items: itemOrItems },
			}
		);
	};

function createParameterItemsForFunction({
	functionDeclaration,
	hasUndeclaredReferenceTo,
}) {
	return (
		functionDeclaration.params
		.flatMap(
			parameter =>
				parameter.type === "ObjectPattern"
				?
				parameter.properties.map(getPropertyName)
				:
				[ parameter.name ],
		)
		.filter(
			parameter =>
				hasUndeclaredReferenceTo({
					parent: functionDeclaration,
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