export = Item

interface Item {
	readonly dependents?: Iterable<Dependency>
	readonly dependsUpon?: Iterable<Dependency>
	readonly items?: Stack
	readonly level: Level
}

export interface Dependency {
	readonly direction?: "above" | "below" | "same"
	readonly mutualStack?: Stack
}

export interface Stack {
	readonly parent?: Item
}

export interface Level {
	readonly stack: Stack
}