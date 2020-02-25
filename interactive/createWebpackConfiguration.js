// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createCodeEditorWebpackEntryForLanguages from "@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages";
import createWebpackConfiguration from "@devsnicket/eunice-test-harnesses/createWebpackConfiguration";
import path from "path";

export default ({
	babelPlugins = [],
	codeEditorLanguages = [],
	directory,
	indexFilePath = path.join(__dirname, "harness.js"),
	javascriptSubstitution = null,
	title = null,
}) => (
	{
		...createWebpackConfiguration({
			babelPlugins,
			directory,
			entry:
				createCodeEditorWebpackEntryForLanguages(codeEditorLanguages),
			indexFile:
				indexFilePath,
			javascriptSubstitution,
			title,
		}),
	}
);