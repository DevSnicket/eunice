const
	createSvgOutputResizableColumn = require("./createSvgOutputResizableColumn"),
	createYamlInputResizableColumn = require("./createYamlInputResizableColumn");

module.exports =
	({
		columnFactory,
		createElement,
		stateful,
	}) =>
		[
			createYamlInputResizableColumn({
				createElement,
				createResizableColumnForInput: columnFactory.createResizableColumnForInput,
				stateful,
			}),
			createSvgOutputResizableColumn({
				createElement,
				createResizableColumnForOutput: columnFactory.createResizableColumnForOutput,
				location,
				state: stateful.state,
			}),
		];