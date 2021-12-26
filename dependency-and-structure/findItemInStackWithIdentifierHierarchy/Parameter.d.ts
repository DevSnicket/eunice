export = Parameter

interface Parameter {
	readonly identifierHierarchy: string[]
	readonly stack: Stack
}

export interface Stack {
	readonly parent?: Item
	readonly reduce: (selector: StackReduceSelector, item: Item) => Item
}

type StackReduceSelector = (item: Item, level: Level) => Item

export interface Item {
	readonly id: string
	readonly items?: Stack
	readonly level: Level
}

interface Level {
	readonly find: (predicate: LevelFindPredicate) => Item
	readonly stack: Stack
}

type LevelFindPredicate = (item: Item) => boolean