const
	formatYaml = require("js-yaml").safeDump,
	parse = require("acorn").parse,
	walk = require("acorn/dist/walk");

const generate = require("./generate");

const
	javascriptTextArea = document.getElementById("javascript"),
	yamlCode = document.getElementById("yaml");

javascriptTextArea.addEventListener("input", generateFromTextareaIntoDiv);

generateFromTextareaIntoDiv();

function generateFromTextareaIntoDiv() {
	const yaml =
		generate({
			file: parse(javascriptTextArea.value, { ecmaVersion: 9 }),
			walk: walk.ancestor,
		});

	yamlCode.innerHTML =
		yaml
		?
		formatYaml(yaml)
		.trim()
		:
		"";
}