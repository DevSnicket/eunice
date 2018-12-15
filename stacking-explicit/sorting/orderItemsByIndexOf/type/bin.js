#!/usr/bin/env node
const
	callWithProcessStandardStreamsOfYaml = require("../../../callWithProcessStandardStreamsOfYaml"),
	orderItemsByType = require("./");

callWithProcessStandardStreamsOfYaml(
	processArguments =>
		orderItemsByType({
			...processArguments,
			typesInOrder:
				processArguments.typesInOrder
				.map(
					type =>
						type === ""
						?
						// type array index of will only work when exact match
						// eslint-disable-next-line no-undefined
						undefined
						:
						type,
				),
		}),
);