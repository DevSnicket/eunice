import Options from "./Options"

export = Parameter

interface Parameter extends Options {
	readonly isBottomUp?: bool
	readonly javascript: string
}