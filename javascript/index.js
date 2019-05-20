#!/usr/bin/env node

const
	analyzeAndProcess = require("./analyzeAndProcess"),
	formatYaml = require("js-yaml").safeDump,
	fs = require("fs"),
	path = require("path"),
	{ getSvgForYaml } = require("@devsnicket/eunice-renderer"),
	{ promisify } = require("util");

const writeFile = promisify(fs.writeFile);

const
	outputDirectory = path.join(__dirname, "output"),
	packagePrefix = "@devsnicket/eunice-";

const yaml =
	formatYaml(
		analyzeAndProcess({
			identifierSeparator: path.sep,
			packageNames: getPackageNames(),
			rootDirectory: path.join(".."),
		}),
		{ lineWidth: Number.MAX_SAFE_INTEGER },
	)
	.replace(
		new RegExp(`'${packagePrefix}(.*)'`, "g"),
		"$1",
	);

writeYaml();
renderAndWriteSvg();

function getPackageNames() {
	return (
		[
			"call-with-process-standard-streams",
			"dependency-and-structure",
			"javascript-analyzer",
			"processors",
			"renderer",
			"run-tests-from-file-system",
			"test-harnesses",
			"test-harnesses-processor-plugins",
		]
		.map(eunicePackageName => `${packagePrefix}${eunicePackageName}`)
	);
}

async function writeYaml() {
	await writeFile(
		path.join(outputDirectory, ".yaml"),
		yaml,
	);
}

async function renderAndWriteSvg() {
	await writeFile(
		path.join(outputDirectory, ".svg"),
		getSvgForYaml({ yaml }),
	);
}