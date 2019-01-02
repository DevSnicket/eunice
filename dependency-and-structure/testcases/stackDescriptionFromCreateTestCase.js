const path = require("path");

module.exports =
	{
		getFromFunction: _function => getFromName(_function.name),
		getFromModule: () => getFromName(path.parse(module.parent.filename).name),
	};

function getFromName(
	name,
) {
	return (
		name.substring(
			"create".length,
			name.length - "TestCase".length,
		)
	);
}