export = Parameter

interface Parameter {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly date
	readonly dependencyPermeableIdentifiers?
	readonly directoryToCreateOrAddToStacksFrom?
	readonly fileExtensions?
	readonly ignorePathPattern?
	readonly includeServiceWorkers?
	readonly isFileContentReversed?
	readonly isInferStacksEnabled?
	readonly modifyStacksFile?
	readonly output
	readonly packages?
	readonly sources
	readonly version
}