/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	() => {
		const dependsUponIdentifiersByParent = new Map();

		return (
			{
				addIdentifierToParent,
				createPropertyForParent,
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

		function createPropertyForParent({
			identifiers = [],
			parent,
		}) {
			const dependsUponIdentifiers =
				[
					...identifiers,
					...dependsUponIdentifiersByParent.get(parent) || [],
				];

			dependsUponIdentifiersByParent.delete(parent);

			return (
				dependsUponIdentifiers.length
				&&
				{ dependsUpon: getFirstOrSort() }
			);

			function getFirstOrSort() {
				return (
					dependsUponIdentifiers.length === 1
					?
					[ ...dependsUponIdentifiers ][0]
					:
					[ ...dependsUponIdentifiers ].sort()
				);
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