export = Parameter

interface Parameter {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly dependencyPermeableIdentifiers?
	readonly directoryToCreateOrAddToStacksFrom?
	readonly fileExtensions?
	readonly ignorePathPattern?
	readonly isFileContentReversed?
	readonly isInferStacksEnabled?
	readonly modifyStacksFile?
	readonly packagePrefixAndScope?
	readonly sources
}