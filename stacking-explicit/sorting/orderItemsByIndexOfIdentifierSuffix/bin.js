#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../../callWithProcessStandardStreamsOfYaml"),
	orderItemsByIdentifierSuffix = require("./");

callWithProcessStandardStreamsOfYaml(
	({
		identifierSuffixesInOrder,
		items,
	}) =>
		orderItemsByIdentifierSuffix({
			identifierSuffixesInOrder:
				Array.isArray(identifierSuffixesInOrder)
				?
				identifierSuffixesInOrder
				:
				identifierSuffixesInOrder && [ identifierSuffixesInOrder ],
			items,
		}),
);