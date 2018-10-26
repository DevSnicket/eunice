module.exports =
	argumentsOfProcess => isSecondArgumentJest(argumentsOfProcess[1]);

function isSecondArgumentJest(
	argument,
) {
	return (
		argument.endsWith("jest")
		||
		argument.endsWith("jest.js")
		||
		argument.endsWith("jest-worker/build/child.js")
	);
}