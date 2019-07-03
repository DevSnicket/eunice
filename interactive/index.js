/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

/* istanbul ignore file: test would be a mirror of implementation */
const
	createWebpackConfiguration = require("./createWebpackConfiguration"),
	createYamlInputElement = require("./createYamlInputElement"),
	createYamlOutputElement = require("./createYamlOutputElement"),
	writeHarness = require("./writeHarness");

module.exports =
	{
		createWebpackConfiguration,
		createYamlInputElement,
		createYamlOutputElement,
		writeHarness,
	};