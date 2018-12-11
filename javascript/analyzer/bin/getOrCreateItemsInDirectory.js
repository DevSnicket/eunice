#!/usr/bin/env node
const
	callWithProcessStandardStreams = require("@devsnicket/eunice-call-with-process-standard-streams"),
	getOrCreateItemsInDirectory = require("../getOrCreateItemsInDirectory"),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

callWithProcessStandardStreams({
	action:
		processArguments =>
			getYamlForItemOrItems(
				getOrCreateItemsInDirectory(
					processArguments,
				),
			),
});