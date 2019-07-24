/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		addDependsUponIdentifier,
		callExpression,
		getIdentifierNameFromAndAddOrUpdateReference,
	}) => {
		for (const argument of getArguments())
			addDependsUponIdentifier(
				getIdentifierFromArgumentWhenRelevant(
					argument,
				),
			);

		function getArguments() {
			return (
				callExpression.arguments.flatMap(
					argument =>
						argument.type === "ObjectExpression"
						?
						getPropertyValues(argument.properties)
						:
						[ argument ],
				)
			);
		}

		function getIdentifierFromArgumentWhenRelevant(
			argument,
		) {
			return (
				argument.type === "Identifier"
				&&
				getIdentifierNameFromAndAddOrUpdateReference(
					argument.name,
				)
			);
		}
	};

function getPropertyValues(
	properties,
) {
	return (
		properties
		.map(
			property =>
				property.type === "SpreadElement"
				?
				property.argument
				:
				property.value,
		)
	);
}