module.exports =
	() => {
		const dependsUponsByParent = new Map();

		return (
			{
				addNameFrom,
				any,
				createPropertyFor,
			}
		);

		function addNameFrom({
			name,
			parent,
		}) {
			const dependsUpons = dependsUponsByParent.get(parent);

			if (dependsUpons)
				dependsUpons.add(name);
			else
				dependsUponsByParent.set(parent, new Set([ name ]));
		}

		function any() {
			return dependsUponsByParent.size != 0;
		}

		function createPropertyFor(
			parent
		) {
			const dependsUpons = dependsUponsByParent.get(parent);

			dependsUponsByParent.delete(parent);

			return dependsUpons && { dependsUpon: [ ...dependsUpons ].sort() };
		}
	};