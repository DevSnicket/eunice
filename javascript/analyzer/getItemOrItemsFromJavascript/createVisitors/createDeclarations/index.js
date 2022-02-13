/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createItemsFromDeclarations from "./createItemsFromDeclarations";

export default () => {
	const declarationsByParents = new Map();

	return (
		{
			addDeclarationIn,
			addDeclarationsIn,
			createItemsForAndRemoveDeclarationsIn,
			findDeclarationAndParent,
			findDeclarationIn,
			getGroupedByParent,
		}
	);

	function addDeclarationIn({
		declaration,
		parent,
	}) {
		addDeclarationsIn({
			declarations: [ declaration ],
			parent,
		});
	}

	function addDeclarationsIn({
		declarations,
		parent,
	}) {
		declarationsByParents.set(
			parent,
			[
				...declarationsByParents.get(parent) || [],
				...declarations,
			],
		);
	}

	function findDeclarationAndParent(
		predicate,
	) {
		return (
			[ ...declarationsByParents.keys() ]
			.reverse()
			.map(
				declarationParent => (
					{
						declaration:
							findDeclarationIn({
								parent: declarationParent,
								predicate,
							}),
						parent:
							declarationParent,
					}
				),
			)
			.filter(
				declarationAndParent =>
					declarationAndParent.declaration,
			)[0]
		);
	}

	function findDeclarationIn({
		parent,
		predicate,
	}) {
		const declarationsOfParent =
			declarationsByParents.get(parent);

		return (
			declarationsOfParent
			&&
			declarationsOfParent.find(predicate)
		);
	}

	function createItemsForAndRemoveDeclarationsIn(
		parent,
	) {
		const declarations = declarationsByParents.get(parent);

		declarationsByParents.delete(parent);

		return createItemsFromDeclarations(declarations);
	}

	function * getGroupedByParent() {
		for (const [ parent, declarations ] of declarationsByParents.entries())
			yield (
				{
					declarations,
					parent,
				}
			);
	}
};