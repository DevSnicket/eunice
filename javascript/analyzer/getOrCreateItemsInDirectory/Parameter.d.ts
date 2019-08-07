import { ParserPlugin } from "@babel/parser"

export = Parameter

interface Parameter extends Options {
	babelParserPlugins?: ParserPlugin[],
	directory: string
	ignorePathPattern?: RegExp,
}