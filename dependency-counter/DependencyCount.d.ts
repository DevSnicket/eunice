export default DependencyCount

interface DependencyCount {
	readonly inner?: DependencyCountOfInner
	readonly outer?: DependencyCountOfOuter
}

export interface DependencyCountOfInner {
	readonly above?: Number
	readonly below?: Number
	readonly same?: Number
}

export interface DependencyCountOfOuter {
	readonly above?: DependencyCountOfOuterByRelationship
	readonly below?: DependencyCountOfOuterByRelationship
	readonly same?: DependencyCountOfOuterByRelationship
}

export interface DependencyCountOfOuterByRelationship {
	readonly dependents?: Number
	readonly dependsUpon?: Number
}