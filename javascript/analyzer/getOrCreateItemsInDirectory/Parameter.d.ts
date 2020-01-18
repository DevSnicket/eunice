import Options from "../getItemOrItemsFromJavascript/Options"

export = Parameter

interface Parameter extends Options {
	readonly areFilesBottomUp?: boolean
	readonly directory: string
	readonly ignorePathPattern?: RegExp
	readonly rootItemIdentifier?: string
}