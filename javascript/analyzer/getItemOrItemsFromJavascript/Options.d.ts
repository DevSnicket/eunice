import { ParserPlugin } from "@babel/parser"

export = Options

interface Options {
	babelParserPlugins?: Iterable<ParserPlugin>
	ignoreStaticMethodsOf?: string[]
}