module.exports =
	() => {
		const dependsUponIdentifiersByParent = new Map();

		return (
			{
				addIdentifierFrom,
				createPropertyFor,
				getGroupedByParent,
			}
		);

		function addIdentifierFrom({
			identifier,
			parent,
		}) {
			const dependsUponIdentifiers = dependsUponIdentifiersByParent.get(parent);

			if (dependsUponIdentifiers)
				dependsUponIdentifiers.add(identifier);
			else
				dependsUponIdentifiersByParent.set(parent, new Set([ identifier ]));
		}

		function createPropertyFor(
			parent,
		) {
			const dependsUponIdentifiers = dependsUponIdentifiersByParent.get(parent);

			dependsUponIdentifiersByParent.delete(parent);

			return (
				dependsUponIdentifiers
				&&
				{ dependsUpon: getFirstOrSort() }
			);

			function getFirstOrSort() {
				return (
					dependsUponIdentifiers.size === 1
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