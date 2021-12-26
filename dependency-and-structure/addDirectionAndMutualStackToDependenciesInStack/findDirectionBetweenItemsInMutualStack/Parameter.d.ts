export = Parameter

interface Parameter {
	readonly from: Item
	readonly to: Item
}

export interface Stack {
	readonly parent?: Item
}

export interface Item {
	readonly items?: Stack
	readonly level: Level
}

interface Level {
	readonly stack: Items & Stack
}

export interface Items {
	readonly indexOf: (level: Level) => number
}