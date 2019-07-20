/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports =
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
					isDeclarationRelevant({ declaration, hasPeerFunction })
					&&
					createItemFromDeclaration({
						...declaration,
						type: getOrInferType(),
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
			}
		}

		function hasPeerExport(
			identifier,
		) {
			return (
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

function isDeclarationRelevant({
	declaration,
	hasPeerFunction,
}) {
	return (
		isNotSelfDependentExport()
		&&
		hasPeerFunctionWhenRequired()
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

	function hasPeerFunctionWhenRequired() {
		return (
			!declaration.isPeerFunctionRequired
			||
			hasPeerFunction(declaration.dependsUpon)
		);
	}

	function isUsedInNestedFunctionWhenRequired() {
		return (
			(declaration.type !== "import" && declaration.type !== "variable")
			||
			declaration.isCalledFromNestedFunction
		);
	}
}

function createItemFromDeclaration({
	id,
	dependsUpon,
	items,
	type,
}) {
	return whenStructured() || id || {};

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