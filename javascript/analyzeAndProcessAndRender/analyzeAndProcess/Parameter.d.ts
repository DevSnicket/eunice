export = Parameter

interface Parameter {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly dependencyPermeableIdentifiers?
	readonly directoryToCreateOrAddToStacksFrom?
	readonly fileExtensions?
	readonly ignorePathPattern?
	readonly isInferStacksEnabled?
	readonly modifyStacksFile?
	readonly packagePrefixAndScope?
	readonly sortItems?
	readonly sources
	readonly structureItems?
}