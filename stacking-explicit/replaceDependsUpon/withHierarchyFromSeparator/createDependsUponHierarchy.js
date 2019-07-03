/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		dependsUpon,
		identifierSeparator,
	}) =>
		withIdentifierSeparator(
			identifierSeparator,
		)
		.replaceDependsUpon(
			dependsUpon,
		);

function withIdentifierSeparator(
	identifierSeparator,
) {
	return { replaceDependsUpon };

	function replaceDependsUpon(
		dependsUpon,
	) {
		return (
			whenString()
			||
			whenArray()
			||
			whenHasIdentifier()
			||
			dependsUpon
		);

		function whenString() {
			return (
				typeof dependsUpon === "string"
				&&
				splitIdentifierIntoHierarchy({
					identifier: dependsUpon,
					items: null,
				})
			);
		}

		function whenArray() {
			return (
				Array.isArray(dependsUpon)
				&&
				dependsUpon.map(replaceDependsUpon)
			);
		}

		function whenHasIdentifier() {
			return (
				dependsUpon
				&&
				dependsUpon.id
				&&
				splitIdentifierIntoHierarchy({
					identifier: dependsUpon.id,
					items: replaceDependsUpon(dependsUpon.items),
				})
			);
		}
	}

	function splitIdentifierIntoHierarchy({
		identifier,
		items,
	}) {
		return (
			identifier
			.split(identifierSeparator)
			.reduceRight(
				(childItems, identifierSegment) =>
					childItems
					?
					{
						id: identifierSegment,
						items: childItems,
					}
					:
					identifierSegment,
				items,
			)
		);
	}
}