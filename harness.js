const
	createElement = require("react").createElement,
	formatYaml = require("js-yaml").safeDump,
	getTextWidth = require("string-pixel-width"),
	parseJavaScript = require("acorn").parse,
	parseYaml = require("js-yaml").safeLoad,
	reactUiElements = require("./Harness/reactUiElements"),
	render = require("react-dom").render,
	walk = require("acorn/dist/walk");

const
	analyze = require("./Analyzers/JavaScript/analyze"),
	getSvgForYaml = require("./Renderer/getSvgElementForYaml");

reactUiElements.renderColumnElementsIntoContainer(
	reactUiElements.createResizableColumnForJavaScriptInput(),
	reactUiElements.createResizableColumnForYamlInput(),
	reactUiElements.createResizableColumnForSvgOutput()
);

const
	javascriptTextArea = document.getElementById("javascript"),
	svgDiv = document.getElementById("svg"),
	yamlTextArea = document.getElementById("yaml");

javascriptTextArea.addEventListener("input", generateFromTextareaIntoDiv);
yamlTextArea.addEventListener("input", renderFromTextareaIntoDiv);

generateFromTextareaIntoDiv();
renderFromTextareaIntoDiv();

function generateFromTextareaIntoDiv() {
	const yaml =
		analyze({
			file: parseJavaScript(javascriptTextArea.value, { ecmaVersion: 9 }),
			walk: walk.ancestor,
		});

	yamlTextArea.value =
		yaml
		?
		formatYaml(yaml)
		.trim()
		:
		"";

	renderFromTextareaIntoDiv();
}

function renderFromTextareaIntoDiv() {
	render(
		getSvgForYaml({
			createElement,
			getTextWidth,
			yaml: parseYaml(yamlTextArea.value),
		}),
		svgDiv
	);
}