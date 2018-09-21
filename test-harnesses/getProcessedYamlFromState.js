const
	{
		safeDump: formatYaml,
		safeLoad: parseYaml,
	} = require("js-yaml");

module.exports =
	state =>
		state.yamlProcessorActions && state.yamlProcessorActions.length
		?
		formatYaml(
			state.yamlProcessorActions.reduce(
				(yaml, action) => action(yaml),
				parseYaml(state.yaml),
			),
			{ lineWidth: Number.MAX_SAFE_INTEGER },
		)
		:
		state.yaml;