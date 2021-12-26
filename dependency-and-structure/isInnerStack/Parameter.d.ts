export = Parameter

interface Parameter {
	readonly source: Stack
	readonly target: Stack
}

interface Stack {
	readonly parent?: Item
}

interface Item {
	readonly level: Level
}

interface Level {
	readonly stack: Stack
}