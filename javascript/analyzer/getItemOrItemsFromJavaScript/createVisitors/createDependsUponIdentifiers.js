module.exports =
	() => {
		const dependsUponIdentifiersByParent = new Map();

		return (
			{
				addIdentifierFrom,
				any,
				createPropertyFor,
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

		function any() {
			return dependsUponIdentifiersByParent.size !== 0;
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
	};