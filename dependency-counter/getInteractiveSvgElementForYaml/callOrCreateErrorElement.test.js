const callOrCreateErrorElement = require("./callOrCreateErrorElement");

const expectedError = "This is a error thrown in test.";

test(
	"exception returns element with error",
	() =>
		expect(
			callOrCreateErrorElement(
				() => {
					throw Error(expectedError);
				}
			)
		)
		.toHaveProperty("props.children", expectedError)
);