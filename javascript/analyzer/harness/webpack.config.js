/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
		});