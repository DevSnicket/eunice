export = Stack

interface Stack extends Array<Level> {
	readonly parent?: Item
}

export interface Item {
	readonly dependsUpon?: Array<DependUpon | DependUponMissing>
	readonly dependents?: Item[]
	readonly id?: string
	readonly items?: Stack
	readonly level: Level
}

interface Level extends Array<Item> {
	readonly stack: Stack
}

interface DependUpon {
	readonly ancestor?: Item
	readonly item: Item
}

interface DependUponMissing {
	readonly ancestors?: Array<Item | string>
	readonly item: string
}