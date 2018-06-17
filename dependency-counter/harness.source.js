const
	createElement = require("react").createElement,
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	render = require("react-dom").render;

const getSvgForYaml = require("./getSvgElementForYaml");

const
	svgDiv = document.getElementById("svg"),
	yamlTextArea = document.getElementById("yaml");

yamlTextArea.addEventListener("input", renderFromTextareaIntoDiv);

renderFromTextareaIntoDiv();

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