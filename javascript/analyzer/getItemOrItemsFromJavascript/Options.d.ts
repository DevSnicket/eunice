import { ParserPlugin } from "@babel/parser"

export = Options

interface Options {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly fileExtensions?: string[]
	readonly isCalleeIgnored?(string): boolean
}