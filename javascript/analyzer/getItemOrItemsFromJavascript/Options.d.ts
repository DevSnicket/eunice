import { ParserPlugin } from "@babel/parser"

export = Options

interface Options {
	readonly babelParserPlugins?: Iterable<ParserPlugin>
	readonly isCalleeIgnored?(string): boolean
}