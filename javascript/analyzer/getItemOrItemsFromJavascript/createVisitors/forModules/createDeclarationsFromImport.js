// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		from,
		specifiers,
		splitDependsUponIntoPathHierarchy,
	}) => {
		return specifiers.map(createFromSpecifier);

		function createFromSpecifier({
			local,
			imported,
		}) {
			return (
				{
					dependsUpon: createDependsUpon(),
					id: local.name,
					type: "import",
				}
			);

			function createDependsUpon() {
				return (
					splitDependsUponIntoPathHierarchy(
						whenHasImported()
						||
						from,
					)
				);

				function whenHasImported() {
					return (
						imported
						&&
						{
							id: from,
							items: imported.name,
						}
					);
				}
			}
		}
	};