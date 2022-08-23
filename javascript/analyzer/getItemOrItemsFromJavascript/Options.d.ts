import { ParserPlugin } from "@babel/parser"

export = Options

interface Options {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly directoryPath?: DirectoryPath
	readonly fileExtensions?: string[]
	readonly isCalleeIgnored?: boolean
	readonly sortItems?
	readonly structureItems?
}

interface DirectoryPath {
	readonly absolute: string
	readonly relative: string
}