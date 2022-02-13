/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

export default ({
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