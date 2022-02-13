/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default () => {
	const dependsUponIdentifiersByParent = new Map();

	return (
		{
			addIdentifierToParent,
			createPropertyAndRemoveIdentifiers,
			getGroupedByParent,
		}
	);

	function addIdentifierToParent({
		identifier,
		parent,
	}) {
		const dependsUponIdentifiers = dependsUponIdentifiersByParent.get(parent);

		if (dependsUponIdentifiers)
			dependsUponIdentifiers.add(identifier);
		else
			dependsUponIdentifiersByParent.set(parent, new Set([ identifier ]));
	}

	function createPropertyAndRemoveIdentifiers({
		identifiers = [],
		parent,
	}) {
		const identifiersOfParent =
			dependsUponIdentifiersByParent.get(parent);

		dependsUponIdentifiersByParent.delete(parent);

		return (
			createPropertyForIdentifiers(
				[
					...identifiers,
					...identifiersOfParent || [],
				],
			)
		);
	}

	function createPropertyForIdentifiers(
		identifiers,
	) {
		return (
			identifiers.length
			&&
			{ dependsUpon: getValue() }
		);

		function getValue() {
			return whenSingle() || identifiers.sort();

			function whenSingle() {
				return (
					identifiers.length === 1
					&&
					identifiers[0]
				);
			}
		}
	}

	function * getGroupedByParent() {
		for (const [ parent, identifiers ] of dependsUponIdentifiersByParent.entries())
			yield (
				{
					identifiers: [ ...identifiers ],
					parent,
				}
			);
	}
};