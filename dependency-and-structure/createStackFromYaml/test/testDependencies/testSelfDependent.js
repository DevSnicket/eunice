const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		const identifier = "item";

		const stack = createStackFromLevels([ [ { id: identifier } ] ]);

		addDependencies();

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"self dependent",
			yaml:
				createItemYaml({
					dependsUpon: identifier,
					id: identifier,
				}),
		});

		function addDependencies() {
			const item = stack[0][0];

			item.dependsUpon = mapItemsToDependsUpon([ item ]);
			item.dependents = [ item ];
		}
	};