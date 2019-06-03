#!/usr/bin/env node

const
	analyzeAndProcessAndRender = require("../analyzeAndProcessAndRender"),
	createParameterFromCliArguments = require("./createParameterFromCliArguments"),
	minimist = require("minimist");

analyzeAndProcessAndRender(
	createParameterFromCliArguments(
		minimist(
			process.argv.slice(2),
			{ boolean: [ "isHtmlSingleFile" ] },
		),
	),
);