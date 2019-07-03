/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		createAncestorSeparatorElement,
		createIdentifierHierarchyAnchor,
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
								createIdentifierHierarchyAnchor(
									[
										...identifierHierarchy,
										item.id,
									],
								),
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