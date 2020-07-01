// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createCodeEditorWebpackEntryForLanguages from "@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages";
import createWebpackConfiguration from "@devsnicket/eunice-test-harnesses/createWebpackConfiguration";
import path from "path";

export default ({
	babelPlugins = [],
	codeEditorLanguages = [],
	directory,
	indexFilePath = path.join(__dirname, "harness.js"),
	isInferStacksEnabled = null,
	mode = null,
	title = null,
	yamlFilePath = null,
}) => (
	{
		...createWebpackConfiguration({
			babelPlugins,
			directory,
			entry:
				createCodeEditorWebpackEntryForLanguages(codeEditorLanguages),
			indexFile:
				indexFilePath,
			javascriptSubstitutions:
				[
					...createJavascriptSubstitutions({
						isInferStacksEnabled,
						mode,
						yamlFilePath,
					}),
				],
			title,
		}),
	}
);

function * createJavascriptSubstitutions({
	isInferStacksEnabled,
	mode,
	yamlFilePath,
}) {
	if (isInferStacksEnabled !== null)
		yield {
			pattern:
				"isInferStacksEnabledLiteralPlaceholder",
			replacement:
				isInferStacksEnabled,
		};

	if (yamlFilePath !== null)
		yield {
			escape:
				mode !== "production",
			pattern:
				"yamlLiteralPlaceholder",
			replacementFilePath:
				yamlFilePath,
		};
}