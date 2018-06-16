const
	createElement = require("react").createElement,
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	render = require("react-dom").render;

const getSvgForYaml = require("./getSvgElementForYaml");

const
	svgTextArea = document.getElementById("svg"),
	yamlDiv = document.getElementById("yaml");

yamlDiv.addEventListener("input", renderFromTextareaIntoDiv);

renderFromTextareaIntoDiv();

function renderFromTextareaIntoDiv() {
	render(
		getSvgForYaml({
			createElement,
			getTextWidth,
			yaml: parseYaml(yamlDiv.value),
		}),
		svgTextArea
	);
}