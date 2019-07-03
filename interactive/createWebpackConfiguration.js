/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
			}),
			// Workaround for renderer harness that requires @ungap/url-search-params using ES (which needs to specify default) instead of CommonJS (which does not and is used by tests).
			resolve:
				{ mainFields: [ "main", "module" ] },
		}
	);