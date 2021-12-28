// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

/* eslint-disable id-length */
/* eslint-disable no-console */

import callWithProcessStandardStreams from "./callWithProcessStandardStreams";

beforeEach(() => action.mockClear());

describe("when standardInputParameter is not specified", () => {
	test("calls action with process arguments parsed by minimist and logs action result", done => {
		mockConsoleLogWithTestDone(done);

		process.argv = processArgumentsBase;

		callWithProcessStandardStreams({ action });

		expect(action)
		.toHaveBeenCalledTimes(1);

		expect(action)
		.toHaveBeenCalledWith(actionArgumentsBase);
	});
});

describe("when standardInputParameter specified and has a process argument", () => {
	test("calls action with process arguments parsed by minimist and logs action result", done => {
		mockConsoleLogWithTestDone(done);

		process.argv = [
			...processArgumentsBase,
			"--TEST_STANDARD_INPUT_PARAMETER=TEST_STANDARD_INPUT_ARGUMENT",
		];

		callWithProcessStandardStreams({
			action,
			standardInputParameter: "TEST_STANDARD_INPUT_PARAMETER",
		});

		expect(action)
		.toHaveBeenCalledTimes(1);

		expect(action)
		.toHaveBeenCalledWith({
			...actionArgumentsBase,
			TEST_STANDARD_INPUT_PARAMETER: "TEST_STANDARD_INPUT_ARGUMENT",
		});
	});
});

describe("when standardInputParameter is specified and is not a process argument", () => {
	test("calls action with process arguments parsed by minimist and from standardIn and logs action result", done => {
		mockConsoleLogWithTestDone(done);

		process.argv = processArgumentsBase;

		const
			resume = jest.fn(),
			setEncoding = jest.fn();

		process.stdin.on = (eventId, listener) => ({
			data: () => listener("TEST_STDIN_DATA"),
			end: () => listener(),
		})[eventId]();
		process.stdin.resume = resume;
		process.stdin.setEncoding = setEncoding;

		callWithProcessStandardStreams({
			action,
			standardInputParameter: "TEST_STANDARD_INPUT_PARAMETER",
		});

		expect(action)
		.toHaveBeenCalledTimes(1);

		expect(action)
		.toHaveBeenCalledWith({
			...actionArgumentsBase,
			TEST_STANDARD_INPUT_PARAMETER: "TEST_STDIN_DATA",
		});
	});
});

function mockConsoleLogWithTestDone(testDone) {
	console.log = jest.fn(message => {
		expect(message)
		.toBe("TEST_ACTION_RESULT");

		testDone();
	});
}

const processArgumentsBase = [
	"TEST_EXEC_PATH",
	"TEST_SCRIPT_PATH",
	"TEST_PARAMETER_1",
	"--TEST_PARAMETER_2=TEST_ARGUMENT_2",
	"TEST_PARAMETER_3",
	"-t=TEST_ARGUMENT_4",
];

const actionResult = "TEST_ACTION_RESULT";

const action = jest.fn(() => actionResult);

const actionArgumentsBase = {
	TEST_PARAMETER_2: "TEST_ARGUMENT_2",
	_: [ "TEST_PARAMETER_1", "TEST_PARAMETER_3" ],
	t: "TEST_ARGUMENT_4",
};