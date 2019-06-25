/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const path = require("path");

const
	getYamlFromJavaScript = require("."),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	action: getYamlFromJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "test-cases/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});

test.each(
	[
		"",
		" --parameter=argument",
	],
)(
	"unix shebang for node with suffix \"%s\"",
	suffix =>
		expect(getYamlFromJavaScript(`#!/usr/bin/env node${suffix}\n`))
		.toEqual(""),
);