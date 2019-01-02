const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createStack = require("../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() =>
		[
			createSelfDependentChildWithParentTestCase(),
			createSelfDependentParentWithChildTestCase(),
		];

const sameIdentifier = "same";

function createSelfDependentChildWithParentTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createSelfDependentChildWithParentTestCase,
				),
			yaml:
				createYaml(),
		}
	);

	function createStackWithDependencies() {
		const { parent, stack } = createStackAndGetParent();

		const child = parent.items[0][0];

		child.dependents = [ child ];
		child.dependsUpon = [ child ];

		return stack;
	}

	function createYaml() {
		return (
			createItemYaml({
				id: sameIdentifier,
				items:
					createItemYaml({
						dependsUpon: sameIdentifier,
						id: sameIdentifier,
						otherIdentifier: "child",
					}),
				otherIdentifier:
					"parent",
			})
		);
	}
}

function createSelfDependentParentWithChildTestCase() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromFunction(
					createSelfDependentParentWithChildTestCase,
				),
			yaml:
				createYaml(),
		}
	);

	function createStackWithDependencies() {
		const { parent, stack } = createStackAndGetParent();

		parent.dependents = [ parent ];
		parent.dependsUpon = [ parent ];

		return stack;
	}

	function createYaml() {
		return (
			createItemYaml({
				dependsUpon:
					sameIdentifier,
				id: sameIdentifier,
				items:
					createItemYaml({
						id: sameIdentifier,
						otherIdentifier: "child",
					}),
				otherIdentifier:
					"parent",
			})
		);
	}
}

function createStackAndGetParent() {
	const stack =
		createStack(
			[
				[
					{
						id: sameIdentifier,
						items:
							[
								[
									{
										id: sameIdentifier,
										otherIdentifier: "child",
									},
								],
							],
						otherIdentifier: "parent",
					},
				],
			],
		);

	return (
		{
			parent: stack[0][0],
			stack,
		}
	);
}