// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createCodeEditorWebpackEntryForLanguages from "@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages";
import createWebpackConfiguration from "@devsnicket/eunice-test-harnesses/createWebpackConfiguration";

export default
(environment, { mode }) => (
	{
		...createWebpackConfiguration({
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
		}),
	}
);