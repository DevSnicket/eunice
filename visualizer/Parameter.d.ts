import CountOfItem from "../dependency-counter/countInItem/CountOfItem"
import ElementContainerFactory from "./createStackWithSummaryGroupFactory/ElementContainerFactory";
import Namespaces from "./Namespaces"

export = Parameter

interface Parameter {
	areDependenciesOfAncestorsIncluded?: boolean
	createElement
	elementContainerFactory?: ElementContainerFactory
	getTextWidth
	namespaces?: Namespaces
	stack: Stack
	style?: string
}

interface Stack extends Array<Array<Item>> {
	readonly parent?: Item
}

export interface Item {
	readonly dependencyCount: CountOfItem
	readonly id?: string
}