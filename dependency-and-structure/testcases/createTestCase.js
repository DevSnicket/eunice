const
	createStack = require("./createStack"),
	prettyFormat = require("pretty-format");

module.exports =
	({
		levels,
		yaml,
	}) => {
		const stack = createStack(levels);

		return (
			{
				stack,
				stackDescription:
					prettyFormat(stack, { min: true }),
				yaml,
			}
		);
	};