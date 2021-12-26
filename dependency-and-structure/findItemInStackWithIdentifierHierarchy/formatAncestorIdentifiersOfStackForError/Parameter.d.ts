export = Stack

interface Stack {
	readonly parent?: Item
}

export interface Item {
	readonly id?: string
	readonly level: Level
}

interface Level {
	readonly stack: Stack
}