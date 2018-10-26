const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createStack = require("../../../testcases/createStack"),
	createUpperAndLowerStack = require("../../../testcases/createUpperAndLowerStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() =>
		[
			createUpperDependsUponLowerTestCase(),
			createLowerDependsUponUpperTestCase(),
		];

function createUpperDependsUponLowerTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createUpperDependsUponLowerTestCase,
				),
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
		}
	);

	function createStackWithDependencies() {
		const { lower, stack, upper } = createStackAndGetUpperAndLower();

		upper.dependsUpon = [ lower ];
		lower.dependents = [ upper ];

		return stack;
	}
}

function createLowerDependsUponUpperTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createLowerDependsUponUpperTestCase,
				),
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
		}
	);

	function createStackWithDependencies() {
		const { lower, stack, upper } = createStackAndGetUpperAndLower();

		lower.dependsUpon = [ upper ];
		upper.dependents = [ lower ];

		return stack;
	}
}

function createStackAndGetUpperAndLower() {
	const stack = createStack(createUpperAndLowerStack());

	return (
		{
			lower: stack[1][0],
			stack,
			upper: stack[0][0],
		}
	);
}