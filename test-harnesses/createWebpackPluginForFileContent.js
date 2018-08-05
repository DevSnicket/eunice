const
	{ readFileSync } = require("fs"),
	{ DefinePlugin } = require("webpack");

module.exports =
	({
		file,
		name,
	}) =>
		new DefinePlugin({ [name]: `\`${readFileSync(file, "utf-8")}\`` });