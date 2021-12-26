export = Stack

interface Stack extends Array<Level> {
	readonly parent?: Item
}

export interface Item {
	readonly dependsUpon?: Array<DependUpon>
	readonly dependents?: Array<Dependent>
	readonly id?: string
	readonly items?: Stack
	readonly level: Level
}

export interface DependUpon {
	readonly itemOrFirstAncestorItem?: Item
}

export interface DependUponFound extends DependUpon {
	readonly item: Item
}

export interface DependUponMissing extends DependUpon {
	readonly ancestors?: Array<Item | string>
	readonly item: string
}

export interface Dependent {
	readonly item: Item
}

export interface Level extends Array<Item> {
	readonly stack: Stack
}