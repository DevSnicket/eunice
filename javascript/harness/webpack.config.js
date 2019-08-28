// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createWebpackConfiguration = require("@devsnicket/eunice-renderer-test-harness/createWebpackConfiguration"),
	path = require("path");

module.exports =
	(environment, { mode }) =>
		createWebpackConfiguration({
			codeEditorLanguages:
				[ "javascript" ],
			directory:
				path.join(__dirname, "output"),
			javascriptSubstitution:
				{
					escape: mode !== "production",
					pattern: "javascriptFromWebpack",
					replacementFilePath: `${__dirname}/example.js`,
				},
		});