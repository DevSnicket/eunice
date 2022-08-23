export = Parameter

interface Parameter {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly date
	readonly dependencyPermeableIdentifiers?
	readonly directoryToCreateOrAddToStacksFrom?
	readonly fileExtensions?
	readonly ignorePathPattern?
	readonly includeServiceWorkers?
	readonly isInferStacksEnabled?
	readonly modifyStacksFile?
	readonly output
	readonly packages?
	readonly sortItems?
	readonly structureItems?
	readonly sources
	readonly version
}