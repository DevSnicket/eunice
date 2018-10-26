const
	createFirstAndSecondLevel = require("../createFirstAndSecondLevel"),
	createItemYaml = require("../../createItemYaml"),
	createStack = require("../../createStack"),
	stackDescriptionFromCreateTestCase = require("../../stackDescriptionFromCreateTestCase");

module.exports =
	() =>
		[
			createFirstDependsUponSecondTestCase(),
			createSecondDependsUponFirstTestCase(),
		];

function createFirstDependsUponSecondTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createFirstDependsUponSecondTestCase,
				),
			yaml:
				[
					createItemYaml({
						dependsUpon: "second",
						id: "first",
					}),
					"second",
				],
		}
	);

	function createStackWithDependencies() {
		const { first, second, stack } = createStackAndGetFirstAndSecond();

		first.dependsUpon = [ second ];
		second.dependents = [ first ];

		return stack;
	}
}

function createSecondDependsUponFirstTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createSecondDependsUponFirstTestCase,
				),
			yaml:
				[
					"first",
					createItemYaml({
						dependsUpon: "first",
						id: "second",
					}),
				],
		}
	);

	function createStackWithDependencies() {
		const { first, second, stack } = createStackAndGetFirstAndSecond();

		second.dependsUpon = [ first ];
		first.dependents = [ second ];

		return stack;
	}
}

function createStackAndGetFirstAndSecond() {
	const stack = createStack([ createFirstAndSecondLevel() ]);

	const level = stack[0];

	return (
		{
			first: level[0],
			second: level[1],
			stack,
		}
	);
}