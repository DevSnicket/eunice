import DependencyCount from "@devsnicket/eunice-dependency-counter/DependencyCount"
import ElementContainerFactory from "./createStackWithSummaryGroupFactory/ElementContainerFactory";
import Namespaces from "./Namespaces"

export = Parameter

interface Parameter {
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
	readonly dependencyCount: DependencyCount
	readonly id?: string
}