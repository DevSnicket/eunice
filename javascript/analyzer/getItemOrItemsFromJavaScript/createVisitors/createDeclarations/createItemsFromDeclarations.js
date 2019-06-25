/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	declarations =>
		declarations
		&&
		declarations
		.map(createItemFromDeclarationWhenRequired)
		.filter(item => item);

function createItemFromDeclarationWhenRequired(
	declaration,
) {
	return createWhenFunction() || createWhenVariableUsedInNestedFunction();

	function createWhenFunction() {
		return (
			declaration.isFunction
			&&
			(createWhenStructured() || declaration.id || {})
		);

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
		}

		function getDependsUponProperty(
			dependsUpon,
		) {
			return dependsUpon && { dependsUpon };
		}
	}

	function createWhenVariableUsedInNestedFunction() {
		return (
			declaration.type === "variable"
			&&
			declaration.isUsedInNestedFunction
			&&
			{
				id: declaration.id,
				type: declaration.type,
				...declaration.dependsUpon && { dependsUpon: declaration.dependsUpon },
			}
		);
	}
}