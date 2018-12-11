#!/usr/bin/env node
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