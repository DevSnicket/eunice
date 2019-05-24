const
	createCodeEditorWebpackEntryForLanguages = require("@devsnicket/eunice-test-harnesses/codeEditor/serviceWorkers/createWebpackEntryForLanguages"),
	createWebpackConfiguration = require("@devsnicket/eunice-test-harnesses/createWebpackConfiguration"),
	pluginDiscoveryCommonjsBabelPlugin = require("@devsnicket/plugin-discovery-commonjs-babel-plugin");

module.exports =
	({
		babelPlugins = [],
		contentFromFile,
		codeEditorLanguages = [],
		outputDirectoryName,
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
				contentFromFile,
				directory:
					`${__dirname}/../output/${outputDirectoryName}`,
				entry:
					createCodeEditorWebpackEntryForLanguages(codeEditorLanguages),
				indexFile:
					"./index.js",
			}),
			// Workaround for renderer harness that requires @ungap/url-search-params using ES (which needs to specify default) instead of CommonJS (which does not and is used by tests).
			resolve:
				{ mainFields: [ "main", "module" ] },
		}
	);