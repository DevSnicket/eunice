#!/usr/bin/env node
const
	callWithProcessStandardStreams = require("@devsnicket/eunice-call-with-process-standard-streams"),
	getOrCreateItemsInDirectory = require("."),
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