// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{
		safeDump: formatYaml,
		safeLoad: parseYaml,
	} = require("js-yaml");

module.exports =
	state =>
		state.processors
		?
		formatYaml(
			state.processors.reduce(
				(items, processor) => processItems({ items, processor }),
				parseYaml(state.yaml),
			),
			{ lineWidth: Number.MAX_SAFE_INTEGER },
		)
		:
		state.yaml;

function processItems({
	items,
	processor,
}) {
	return (
		processor.isEnabled
		?
		processor.action(
			getArguments(),
		)
		:
		items
	);

	function getArguments() {
		return (
			processor.parameter
			?
			{
				items,
				[processor.parameter.name]: processor.argument,
			}
			:
			items
		);
	}
}