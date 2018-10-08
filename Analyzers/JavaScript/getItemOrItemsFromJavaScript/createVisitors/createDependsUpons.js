module.exports =
	() => {
		const dependsUponsByParent = new Map();

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
			const dependsUpons = dependsUponsByParent.get(parent);

			if (dependsUpons)
				dependsUpons.add(identifier);
			else
				dependsUponsByParent.set(parent, new Set([ identifier ]));
		}

		function any() {
			return dependsUponsByParent.size !== 0;
		}

		function createPropertyFor(
			parent,
		) {
			const dependsUpons = dependsUponsByParent.get(parent);

			dependsUponsByParent.delete(parent);

			return (
				dependsUpons
				&&
				{ dependsUpon: getFirstOrSort() }
			);

			function getFirstOrSort() {
				return (
					dependsUpons.size === 1
					?
					[ ...dependsUpons ][0]
					:
					[ ...dependsUpons ].sort()
				);
			}
		}
	};