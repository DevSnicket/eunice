#!/usr/bin/env node
/* istanbul ignore file: only used when JavaScript file is process entry point */
const
	callWhenProcessEntryPoint = require("@devsnicket/eunice-call-when-process-entry-point"),
	getOrCreateItemsInDirectory = require("../getOrCreateItemsInDirectory"),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

callWhenProcessEntryPoint({
	action:
		processArguments =>
			getYamlForItemOrItems(
				getOrCreateItemsInDirectory(
					processArguments,
				),
			),
});