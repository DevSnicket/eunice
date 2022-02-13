/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

export default
declarations => {
	return (
		declarations
		&&
		declarations.flatMap(createRelevantItemsFromDeclaration)
	);

	function createRelevantItemsFromDeclaration(
		declaration,
	) {
		return whenRelevant() || [];

		function whenRelevant() {
			return (
				isDeclarationRelevant(declaration)
				&&
				createItemFromDeclaration({
					...declaration,
					dependsUpon:
						hasPeerFunctionWhenRequired()
						&&
						declaration.dependsUpon,
					type:
						getOrInferType(),
				})
			);

			function getOrInferType() {
				return declaration.type || inferType();

				function inferType() {
					return (
						hasPeerExport(declaration.id)
						&&
						"export"
					);
				}
			}

			function hasPeerFunctionWhenRequired() {
				return (
					!declaration.isPeerFunctionRequired
					||
					hasPeerFunction(declaration.dependsUpon)
				);
			}
		}
	}

	function hasPeerExport(
		identifier,
	) {
		return (
			identifier
			&&
			declarations.some(
				declaration =>
					declaration.type === "export"
					&&
					declaration.id === identifier,
			)
		);
	}

	function hasPeerFunction(
		identifier,
	) {
		return (
			declarations.some(
				declaration =>
					!declaration.type
					&&
					declaration.id === identifier,
			)
		);
	}
};

function isDeclarationRelevant(
	declaration,
) {
	return (
		isNotSelfDependentExport()
		&&
		isUsedInNestedFunctionWhenRequired()
	);

	function isNotSelfDependentExport() {
		return (
			declaration.type !== "export"
			||
			!declaration.id
			||
			declaration.id !== declaration.dependsUpon
		);
	}

	function isUsedInNestedFunctionWhenRequired() {
		return (
			(declaration.type !== "import" && declaration.type !== "variable")
			||
			declaration.isCalledFromNestedFunction
			||
			declaration.isExtensionOfClass
		);
	}
}

function createItemFromDeclaration({
	id,
	dependsUpon,
	items,
	type,
}) {
	return whenStructured() || id;

	function whenStructured() {
		return (
			(dependsUpon || items || type)
			&&
			{
				...id && { id },
				...type && { type },
				...dependsUpon && { dependsUpon },
				...items && { items },
			}
		);
	}
}