/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		addUndeclaredReference,
		findDeclarationAndParent,
		parentFunctions,
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
				parent: parentFunctions && parentFunctions.blockOrIdentifiable,
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
					parentFunctions
					?
					declarationAndParent.parent === parentFunctions.blockOrIdentifiable
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