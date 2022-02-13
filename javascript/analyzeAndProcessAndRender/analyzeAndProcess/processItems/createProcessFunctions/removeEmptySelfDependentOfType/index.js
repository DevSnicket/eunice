/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import replaceIdentifiersAndItems from "../replaceIdentifiersAndItems";

export default ({
	identifierOrItemOrLevelOrStack,
	types,
}) =>
	replaceIdentifiersAndItems({
		identifierOrItemOrLevelOrStack,
		replace:
			({ identifierOrItem }) =>
				removeSelfDependentOfTypes({
					identifierOrItem,
					types,
				}),
	});

function removeSelfDependentOfTypes({
	identifierOrItem,
	types,
}) {
	return (
		isOfTypeAndSelfDependent()
		?
		null
		:
		identifierOrItem
	);

	function isOfTypeAndSelfDependent() {
		return (
			types.includes(identifierOrItem.type)
			&&
			isEmptyAndSelfDependent(identifierOrItem)
		);
	}
}

function isEmptyAndSelfDependent({
	id: identifier,
	dependsUpon,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	type,
	...restOfItem
}) {
	return isEmpty() && isSelfDependent();

	function isEmpty() {
		return !Object.keys(restOfItem).length;
	}

	function isSelfDependent() {
		return (
			withLowerCaseFirstCharacter(getSingleDependsUpon(dependsUpon))
			===
			withLowerCaseFirstCharacter(identifier)
		);
	}
}

function getSingleDependsUpon(
	dependsUpon,
) {
	return whenString() || whenSingleItemArray();

	function whenString() {
		return (
			typeof dependsUpon === "string"
			&&
			dependsUpon
		);
	}

	function whenSingleItemArray() {
		return (
			Array.isArray(dependsUpon)
			&&
			dependsUpon.length === 1
			&&
			dependsUpon[0]
		);
	}
}

function withLowerCaseFirstCharacter(
	value,
) {
	return (
		value
		&&
		value.length
		&&
		value[0].toLowerCase() + value.substring(1)
	);
}