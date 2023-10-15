export = Parameter

interface Parameter {
	readonly babelParserPlugins?
	readonly dependencyPermeableIdentifiers?
	readonly directories?
	readonly fileExtensions?
	readonly ignorePathPattern?
	readonly includeServiceWorkers?
	readonly inferStacks?
	readonly jsxElementsToIgnore?
	readonly modifyStacksFile?
	readonly modifyStacksKey?
	readonly modifyStacksPattern?
	readonly outputBaseFileName?
	readonly outputDirectoryPath?
	readonly outputHtml?
	readonly outputSvg?
	readonly outputYaml?
	readonly packageNames?
	readonly packagePrefix?
	readonly packageScope?
	readonly pathSeparator?
	readonly reverseFileContent?
	readonly rootItemIdentifiers?
	readonly stackFileContent?
}