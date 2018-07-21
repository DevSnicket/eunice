const
	createElement = require("react").createElement,
	render = require("react-dom").render,
	{
		ReflexContainer,
		ReflexSplitter,
		ReflexElement,
	} = require("react-reflex");

// for webpack
require("file-loader?name=harness.html!./harness.html");
require("file-loader?name=react-reflex.css!react-reflex/styles.css");

module.exports =
	{
		createResizableColumn,
		createResizableColumnForJavaScriptInput,
		createResizableColumnForSvgOutput,
		createResizableColumnForYamlInput,
		renderColumnElementsIntoContainer,
	};

function renderColumnElementsIntoContainer(
	...columns
) {
	render(
		createElement(
			ReflexContainer,
			{ orientation: "vertical" },
			columns
			.reduce(
				(elements, column) =>
					[
						...elements,
						elements.length ? createSplitter() : null,
						column,
					],
				[]
			)
		),
		document.getElementById("container")
	);
}

function createResizableColumnForJavaScriptInput() {
	return (
		createResizableColumnForTextInput({
			id: "javascript",
			text:
`function Called() {}

function NotCalled() {}

function Callee() {
	Called();
	NestedInCallee();

	function NestedInCallee() {}
}`,
			title: "JavaScript",
		})
	);
}

function createResizableColumnForYamlInput(
	yaml = null
) {
	return (
		createResizableColumnForTextInput({
			id: "yaml",
			text: yaml,
			title: "YAML",
		})
	);
}

function createResizableColumnForTextInput({
	id,
	text = null,
	title,
}) {
	return (
		createResizableColumn({
			element:
				createElement(
					"textarea",
					{
						defaultValue: text,
						id,
					}
				),
			title,
		})
	);
}

function createResizableColumnForSvgOutput() {
	return (
		createResizableColumn({
			element:
				createElement(
					"div",
					{
						id: "svg",
						style: { flex: 1 },
					}
				),
			title: "SVG",
		})
	);
}

function createResizableColumn({
	element,
	title,
}) {
	return (
		createElement(
			ReflexElement,
			null,
			createElement(
				"div",
				{ className: "column" },
				title,
				element
			)
		)
	);
}

function createSplitter() {
	return (
		createElement(
			ReflexSplitter,
			null,
			createElement("div", null, "|".repeat(3))
		)
	);
}