const
	createCodeEditorWebpackEntryForLanguages = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages"),
	createWebpackConfiguration = require("@devsnicket/eunice-test-harnesses/createWebpackConfiguration");

module.exports =
	createWebpackConfiguration({
		directory:
			`${__dirname}/output/`,
		entry:
			createCodeEditorWebpackEntryForLanguages(
				[ "javascript" ],
			),
		indexFile:
			"./harness/index.js",
		javascriptSubstitution:
			{
				pattern: "javascriptFromWebpack",
				replacementFilePath: `${__dirname}/example.js`,
			},
	});