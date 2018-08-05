const getSvgElementFromYamlOrErrorElement = require("./getSvgElementFromYamlOrErrorElement");

test(
	"invalid YAML returns element with error",
	() =>
		expect(getSvgElementFromYamlOrErrorElement("`"))
		.toHaveProperty("props.children", "end of the stream or a document separator is expected at line 1, column 1:\n    `\n    ^")
);