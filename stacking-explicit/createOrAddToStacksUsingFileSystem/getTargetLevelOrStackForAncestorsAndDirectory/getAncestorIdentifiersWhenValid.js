/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	ancestors,
	subsetIdentifierHierarchy,
}) => {
	return (
		subsetIdentifierHierarchy
		?
		whenInSubset()
		:
		whenAllIdentifiable(ancestors)
	);

	function whenInSubset() {
		return (
			ancestors.length >= subsetIdentifierHierarchy.length
			&&
			ancestors.reduce(
				withSubsetIdentifierHierarchy(subsetIdentifierHierarchy)
				.aggregateAncestorIdentifiersInSubset,
				[],
			)
		);
	}
};

function withSubsetIdentifierHierarchy(
	subsetIdentifierHierarchy,
) {
	return { aggregateAncestorIdentifiersInSubset };

	function aggregateAncestorIdentifiersInSubset(
		identifiers,
		ancestor,
		index,
	) {
		return (
			identifiers
			&&
			whenIdentifiableOrInSubset()
		);

		function whenIdentifiableOrInSubset() {
			return (
				isInSubset()
				?
				whenIdentifiable()
				:
				whenSubsetMatch()
			);
		}

		function isInSubset() {
			return index >= subsetIdentifierHierarchy.length;
		}

		function whenIdentifiable() {
			return (
				ancestor.id
				&&
				[ ...identifiers, ancestor.id ]
			);
		}

		function whenSubsetMatch(
		) {
			return (
				isSubsetMatch()
				&&
				identifiers
			);

			function isSubsetMatch() {
				const subsetIdentifier = subsetIdentifierHierarchy[index];

				return (
					subsetIdentifier === ancestor.id
					||
					(!subsetIdentifier && !ancestor.id)
				);
			}
		}
	}
}

function whenAllIdentifiable(
	ancestors,
) {
	return (
		ancestors.reduce(
			(
				identifiers,
				ancestor,
			) =>
				identifiers
				&&
				ancestor.id
				&&
				[ ...identifiers, ancestor.id ],
			[],
		)
	);
}