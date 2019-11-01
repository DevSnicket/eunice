// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createCodeEditorWebpackEntryForLanguages = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages"),
	createWebpackConfiguration = require("@devsnicket/eunice-test-harnesses/createWebpackConfiguration"),
	pluginDiscoveryCommonjsBabelPlugin = require("@devsnicket/plugin-discovery-commonjs-babel-plugin");

module.exports =
	({
		babelPlugins = [],
		codeEditorLanguages = [],
		directory,
		javascriptSubstitution = null,
		title = null,
	}) => (
		{
			...createWebpackConfiguration({
				babelPlugins:
					[
						[
							pluginDiscoveryCommonjsBabelPlugin,
							...babelPlugins,
						],
					],
				directory,
				entry:
					createCodeEditorWebpackEntryForLanguages(codeEditorLanguages),
				indexFile:
					"./harness.js",
				javascriptSubstitution,
				title,
			}),
		}
	);