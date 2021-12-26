export interface OfItem {
	readonly ancestors?: ByDirectionAndRelationship
	readonly descendants?: ByDirection
	readonly parent?: ByDirectionAndRelationship
}

export interface ByDirectionAndRelationship {
	readonly above?: ByRelationship
	readonly below?: ByRelationship
	readonly same?: ByRelationship
}

export interface ByRelationship {
	readonly dependents?: Number
	readonly dependsUpon?: Number
}

export interface ByDirection {
	readonly above?: Number
	readonly below?: Number
	readonly same?: Number
}