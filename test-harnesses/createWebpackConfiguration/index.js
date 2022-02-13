/* Eunice
Copyright (c) 2018 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

// cSpell:words devtool

import createModuleWithBabelPlugins from "./createModuleWithBabelPlugins";
import createTransformJavascriptToHtmlPlugin from "./createTransformJavascriptToHtmlPlugin";
import path from "path";
import webpack from "webpack";

export default ({
	babelPlugins = [],
	directory,
	entry = null,
	indexFile,
	javascriptSubstitutions = [],
	title = "Test Harness",
}) => (
	{
		devtool:
			"source-map",
		entry:
			{
				...entry,
				harness: [ "@babel/polyfill", indexFile ],
			},
		externals:
			{ "./createWebpackConfiguration": "null" },
		module:
			createModuleWithBabelPlugins(babelPlugins),
		node:
			{ fs: "empty" },
		output:
			{
				filename: "[name].js",
				path: path.resolve(directory),
			},
		plugins:
			[
				createTransformJavascriptToHtmlPlugin({
					directory,
					javascriptSubstitutions,
					title,
				}),
				new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
			],
		// Workaround for renderer harness that requires @ungap/url-search-params using ES (which needs to specify default) instead of CommonJS (which does not and is used by tests).
		resolve:
			{ mainFields: [ "main", "module" ] },
	}
);