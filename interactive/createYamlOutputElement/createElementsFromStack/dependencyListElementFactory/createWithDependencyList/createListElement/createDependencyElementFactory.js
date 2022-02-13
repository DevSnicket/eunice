/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	createAncestorSeparatorElement,
	createItemInIdentifierHierarchyElement,
}) => {
	return (
		{
			createElements:
				dependency =>
					createForItem(dependency)
					.elements,
		}
	);

	function createForItem(
		item,
	) {
		return (
			createForItemWithAncestors(
				createForAncestors(),
			)
		);

		function createForAncestors() {
			return (
				createForAncestorsWhenHasParent(item)
				||
				{
					elements: [],
					identifierHierarchy: [],
				}
			);
		}

		function createForItemWithAncestors({
			elements,
			identifierHierarchy,
		}) {
			return (
				{
					elements:
						[
							...elements,
							createItemInIdentifierHierarchyElement({
								identifierHierarchy:
									[
										...identifierHierarchy,
										item.id,
									],
								item,
							}),
						],
					identifierHierarchy,
				}
			);
		}
	}

	function createForAncestorsWhenHasParent(
		{ level: { stack: { parent } } },
	) {
		return (
			parent
			&&
			createAsAncestor()
		);

		function createAsAncestor() {
			const
				{
					elements,
					identifierHierarchy,
				} = createForItem(parent);

			return (
				{
					elements:
						[
							...elements,
							createAncestorSeparatorElement(),
						],
					identifierHierarchy:
						[
							...identifierHierarchy,
							parent.id,
						],
				}
			);
		}
	}
};