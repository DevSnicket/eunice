export default DependencyCount

interface DependencyCount {
	readonly ancestor?: DependencyCountOfAncestor
	readonly descendant?: DependencyCountOfDescendant
	readonly parent?: DependencyCountOfAncestor
}

export interface DependencyCountOfDescendant {
	readonly above?: Number
	readonly below?: Number
	readonly same?: Number
}

export interface DependencyCountOfAncestor {
	readonly above?: DependencyCountOfAncestorByRelationship
	readonly below?: DependencyCountOfAncestorByRelationship
	readonly same?: DependencyCountOfAncestorByRelationship
}

export interface DependencyCountOfAncestorByRelationship {
	readonly dependents?: Number
	readonly dependsUpon?: Number
}