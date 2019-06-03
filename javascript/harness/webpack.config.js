const
	createWebpackConfiguration = require("@devsnicket/eunice-renderer-test-harness/createWebpackConfiguration"),
	path = require("path");

module.exports =
	createWebpackConfiguration({
		codeEditorLanguages:
			[ "javascript" ],
		directory:
			path.join(__dirname, "output"),
		javascriptSubstitution:
			{
				pattern: "javascriptFromWebpack",
				replacementFilePath: `${__dirname}/example.js`,
			},
	});