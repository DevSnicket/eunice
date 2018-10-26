const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createParentChildLevels = require("../../../testcases/createParentChildLevels"),
	createStack = require("../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() =>
		[
			createParentDependsUponChildTestCase(),
			createChildDependsUponParentTestCase(),
		];

function createParentDependsUponChildTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createParentDependsUponChildTestCase,
				),
			yaml:
				createItemYaml({
					dependsUpon: "child",
					id: "parent",
					items: "child",
				}),
		}
	);

	function createStackWithDependencies() {
		const { child, parent, stack } = createStackAndGetParentAndChild();

		parent.dependsUpon = [ child ];
		child.dependents = [ parent ];

		return stack;
	}
}

function createChildDependsUponParentTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createChildDependsUponParentTestCase,
				),
			yaml:
				{
					id:
						"parent",
					items:
						createItemYaml({
							dependsUpon: "parent",
							id: "child",
						}),
				},
		}
	);

	function createStackWithDependencies() {
		const { child, parent, stack } = createStackAndGetParentAndChild();

		child.dependsUpon = [ parent ];
		parent.dependents = [ child ];

		return stack;
	}
}

function createStackAndGetParentAndChild() {
	const stack = createStack(createParentChildLevels());

	const parent = stack[0][0];

	return (
		{
			child: parent.items[0][0],
			parent,
			stack,
		}
	);
}