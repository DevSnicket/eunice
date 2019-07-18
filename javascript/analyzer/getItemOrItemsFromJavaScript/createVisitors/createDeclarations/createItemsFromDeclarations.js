/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports =
	declarations => {
		return (
			declarations
			&&
			declarations
			.flatMap(
				declaration =>
					createItemsFromDeclarationWhenRequired({
						declaration,
						hasPeerFunctionWithIdentifier,
					}),
			)
		);

		function hasPeerFunctionWithIdentifier(
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

function createItemsFromDeclarationWhenRequired({
	declaration,
	hasPeerFunctionWithIdentifier,
}) {
	return (
		createWhenExport()
		||
		createWhenVariable()
		||
		createAsFunction()
	);

	function createWhenExport() {
		return (
			declaration.type === "export"
			&&
			(createWhenDependsUponFunction() || [])
		);

		function createWhenDependsUponFunction() {
			return (
				hasPeerFunctionWithIdentifier(declaration.dependsUpon)
				&&
				[ {
					id: declaration.id,
					type: declaration.type,
					// match expected key order in YAML output
					// eslint-disable-next-line sort-keys
					dependsUpon: declaration.dependsUpon,
				} ]
			);
		}
	}

	function createWhenVariable() {
		return (
			declaration.type === "variable"
			&&
			(createWhenUsedInNestedFunction() || [])
		);

		function createWhenUsedInNestedFunction() {
			return (
				declaration.isUsedInNestedFunction
				&&
				[ {
					id: declaration.id,
					type: declaration.type,
					...declaration.dependsUpon && { dependsUpon: declaration.dependsUpon },
				} ]
			);
		}
	}

	function createAsFunction() {
		return createWhenStructured() || declaration.id || {};

		function createWhenStructured() {
			return (
				(declaration.dependsUpon || declaration.items)
				&&
				{
					...declaration.id && { id: declaration.id },
					...getDependsUponProperty(declaration.dependsUpon),
					...declaration.items && { items: declaration.items },
				}
			);

			function getDependsUponProperty(
				dependsUpon,
			) {
				return dependsUpon && { dependsUpon };
			}
		}
	}
}