import Options from "../getItemOrItemsFromJavascript/Options"

export = Parameter

interface Parameter extends Options {
	directory: string
	ignorePathPattern?: RegExp
}