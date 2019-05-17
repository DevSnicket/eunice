const
	createCodeEditorWebpackEntryForLanguages = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages"),
	{ createWebpackConfiguration } = require("@devsnicket/eunice-test-harnesses");

module.exports =
	createWebpackConfiguration({
		contentFromFile:
			{
				file: `${__dirname}/example.js`,
				placeholder: "javascriptFromWebpack",
			},
		directory:
			`${__dirname}/output/`,
		entry:
			createCodeEditorWebpackEntryForLanguages(
				[ "javascript" ],
			),
		indexFile:
			"./harness/index.js",
	});