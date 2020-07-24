export = Stack

interface Stack extends Array<Level> {
	readonly parent?: Item
}

export interface Item {
	readonly dependencyCount?: DependencyCountOfItem
	readonly dependents?: Item[]
	readonly dependsUpon?: Array<DependUpon | DependUponMissing>
	readonly id?: string
	readonly items?: Stack
	readonly level: Level
}

export interface DependencyCountOfItem {
	readonly inner?: DependencyCountOfInner
	readonly outer?: DependencyCountOfOuter
}

export interface DependencyCountOfInner {
	readonly above?: Number
	readonly below?: Number
	readonly same?: Number
}

export interface DependencyCountOfOuter {
	readonly above?: DependencyCountOfRelationship
	readonly below?: DependencyCountOfRelationship
	readonly same?: DependencyCountOfRelationship
}

export interface DependencyCountOfOuterByRelationship {
	readonly dependents?: Number
	readonly dependsUpon?: Number
}

export interface Level extends Array<Item> {
	readonly stack: Stack
}

export interface DependUpon {
	readonly ancestor?: Item
	readonly item: Item
}

export interface DependUponMissing {
	readonly ancestors?: Array<Item | string>
	readonly item: string
}