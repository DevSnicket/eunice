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