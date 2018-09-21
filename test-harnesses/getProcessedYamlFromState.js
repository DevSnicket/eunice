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
				[processor.parameter]: processor.argument,
			}
			:
			items
		);
	}
}