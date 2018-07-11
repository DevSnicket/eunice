module.exports =
	argument =>
		argument.endsWith("jest")
		||
		argument.endsWith("jest.js")
		||
		argument.endsWith("jest-worker/build/child.js");