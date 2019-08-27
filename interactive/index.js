// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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