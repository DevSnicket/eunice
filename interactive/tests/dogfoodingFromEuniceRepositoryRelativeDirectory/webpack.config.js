const
	createWebpackConfiguration = require("../../createWebpackConfiguration"),
	path = require("path");

module.exports =
	(environment, { mode }) =>
		createWebpackConfiguration({
			directory:
				path.join(__dirname, "output"),
			javascriptSubstitution:
				{
					escape: mode !== "production",
					pattern: new RegExp("(?<=yaml:|yaml: )yamlFromWebpack"),
					replacementFilePath: "../eunice/dogfooding/output/index.yaml",
				},
		});