import Options from "../getItemOrItemsFromJavascript/Options"

export = Parameter

interface Parameter extends Options {
	readonly directory: string
	readonly ignorePathPattern?: RegExp
	readonly rootItemIdentifier?: string
}