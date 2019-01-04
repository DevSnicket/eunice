const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		testSelfDependentChildWithParent();
		testSelfDependentParentWithChild();
	};

const sameIdentifier = "same";

function testSelfDependentChildWithParent() {
	testCreateStackFromYaml({
		stack:
			createStackWithDependencies(),
		stackDescription:
			"self dependent child with parent",
		yaml:
			createYaml(),
	});

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

function testSelfDependentParentWithChild() {
	return (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				"self dependent parent with child",
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
		createStackFromLevels(
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