/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	addUndeclaredReference,
	findDeclarationAndParent,
	parent,
	reference,
}) => {
	const declarationAndParent =
		findDeclarationAndParent(
			isReferencedDeclaration,
		);

	if (declarationAndParent)
		return getNameFromDeclaration();
	else {
		addUndeclaredReference({
			parent,
			reference,
		});

		return reference;
	}

	function isReferencedDeclaration({
		id: identifier,
		type,
	}) {
		return (
			(type === "import" || type === "variable")
			&&
			identifier === reference
		);
	}

	function getNameFromDeclaration() {
		return (
			declarationAndParent.declaration.dependsUpon
			?
			getNameWhenDependsUpon()
			:
			!isParent() && getNameAndSetWhenUsedInNestedFunction()
		);

		function getNameWhenDependsUpon() {
			return (
				isParent()
				?
				declarationAndParent.declaration.dependsUpon
				:
				getNameAndSetWhenUsedInNestedFunction()
			);
		}

		function isParent() {
			return (
				parent
				?
				declarationAndParent.parent === parent
				:
				!declarationAndParent.parent
			);
		}

		function getNameAndSetWhenUsedInNestedFunction() {
			declarationAndParent.declaration.isCalledFromNestedFunction = true;

			return reference;
		}
	}
};