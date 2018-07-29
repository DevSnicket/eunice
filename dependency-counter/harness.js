const
	getSvgForYaml = require("./getSvgForYaml"),
	reactUiElements = require("../Harnesses/reactUiElements");

reactUiElements.renderColumnElementsIntoContainer(
	// yamlFromWebpack is replaced with literal by harness/webpack.config.js
	// eslint-disable-next-line no-undef
	reactUiElements.createResizableColumnForYamlInput(yamlFromWebpack),
	reactUiElements.createResizableColumnForSvgOutput()
);

const
	svgDiv = document.getElementById("svg"),
	yamlTextArea = document.getElementById("yaml");

yamlTextArea.addEventListener("input", renderFromTextareaIntoDiv);

renderFromTextareaIntoDiv();

function renderFromTextareaIntoDiv() {
	svgDiv.innerHTML = getSvgForYaml({ yaml: yamlTextArea.value });
}