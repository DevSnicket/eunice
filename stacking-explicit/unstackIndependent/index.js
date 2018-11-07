const
	callWithYamlInputAndOutputWhenProcessEntryPoint = require("../callWithYamlInputAndOutputWhenProcessEntryPoint"),
	{ createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure"),
	processorPlugins = require("../../Renderer/harness/processorPlugins");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlInputAndOutputWhenProcessEntryPoint(
	parameters => unstackIndependent(parameters.items),
);

processorPlugins.plugIn({
	action: unstackIndependent,
	text: "unstack independent",
});

module.exports = unstackIndependent;

function unstackIndependent(
	items,
) {
	return (
		createYamlFromStack(
			unstackIndependentInStack(
				createStackFromYaml(
					items,
				),
			),
		)
	);
}

function unstackIndependentInStack(
	stack,
) {
	return (
		getStackFromAggregation(
			stack.reduce(
				aggregate,
				{ stack: [] },
			),
		)
	);
}

function aggregate(
	{ lastLevel, stack },
	currentLevel,
) {
	unstackIndependentItemsInLevel();

	return (
		!lastLevel || anyDependenciesWithCurrentLevel(lastLevel)
		?
		addCurrentAsNewLevel()
		:
		combineCurrentWithLast()
	);

	function unstackIndependentItemsInLevel() {
		for (const item of currentLevel)
			if (item.items)
				item.items = unstackIndependentInStack(item.items);
	}

	function anyDependenciesWithCurrentLevel(
		level,
	) {
		return (
			level.some(
				item =>
					anyInCurrentLevel(item.dependents)
					||
					anyInCurrentLevel(item.dependsUpon)
					||
					(item.items && item.items.some(anyDependenciesWithCurrentLevel)),
			)
		);
	}

	function anyInCurrentLevel(
		items,
	) {
		return (
			items
			&&
			items.some(item => hasLevelOfOrInCurrentLevel(item.level))
		);
	}

	function hasLevelOfOrInCurrentLevel(
		level,
	) {
		return level && isOrIsInCurrentLevel();

		function isOrIsInCurrentLevel() {
			return (
				level === currentLevel
				||
				(level.stack.parent && hasLevelOfOrInCurrentLevel(level.stack.parent.level))
			);
		}
	}

	function addCurrentAsNewLevel() {
		return (
			{
				lastLevel:
					currentLevel,
				stack:
					lastLevel
					?
					[
						...stack,
						lastLevel,
					]
					:
					stack,
			}
		);
	}

	function combineCurrentWithLast() {
		return (
			{
				lastLevel:
					[
						...lastLevel,
						...currentLevel,
					],
				stack,
			}
		);
	}
}

function getStackFromAggregation({
	lastLevel,
	stack,
}) {
	return (
		[
			...stack,
			lastLevel,
		]
	);
}