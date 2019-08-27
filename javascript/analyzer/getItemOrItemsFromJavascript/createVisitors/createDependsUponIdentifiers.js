// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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