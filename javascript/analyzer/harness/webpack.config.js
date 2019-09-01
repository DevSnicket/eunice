// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createCodeEditorWebpackEntryForLanguages = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages"),
	createWebpackConfiguration = require("@devsnicket/eunice-test-harnesses/createWebpackConfiguration");

module.exports =
	(environment, { mode }) =>
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
					escape: mode !== "production",
					pattern: new RegExp("(?<=javascript:|javascript: )javascriptFromWebpack"),
					replacementFilePath: `${__dirname}/example.js`,
				},
			title:
				"JavaScript Analyzer",
		});