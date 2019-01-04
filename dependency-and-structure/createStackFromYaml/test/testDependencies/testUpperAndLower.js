const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	createUpperAndLowerStack = require("../../../tests/createUpperAndLowerStack"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		testUpperDependsUponLower();
		testLowerDependsUponUpper();
	};

function testUpperDependsUponLower() {
	testCreateStackFromYaml({
		stack:
			createStackWithDependencies(),
		stackDescription:
			"upper depends upon lower",
		yaml:
			[
				[
					createItemYaml({
						dependsUpon: "lower",
						id: "upper",
					}),
				],
				[ "lower" ],
			],
	});

	function createStackWithDependencies() {
		const { lower, stack, upper } = createStackAndGetUpperAndLower();

		upper.dependsUpon = [ lower ];
		lower.dependents = [ upper ];

		return stack;
	}
}

function testLowerDependsUponUpper() {
	testCreateStackFromYaml({
		stack:
			createStackWithDependencies(),
		stackDescription:
			"lower depends upon upper",
		yaml:
			[
				[ "upper" ],
				[
					createItemYaml({
						dependsUpon: "upper",
						id: "lower",
					}),
				],
			],
	});

	function createStackWithDependencies() {
		const { lower, stack, upper } = createStackAndGetUpperAndLower();

		lower.dependsUpon = [ upper ];
		upper.dependents = [ lower ];

		return stack;
	}
}

function createStackAndGetUpperAndLower() {
	const stack = createStackFromLevels(createUpperAndLowerStack());

	return (
		{
			lower: stack[1][0],
			stack,
			upper: stack[0][0],
		}
	);
}