import ElementContainerFactory from "./createStackWithSummaryGroupFactory/ElementContainerFactory";
import Namespaces from "./Namespaces"
import { Stack } from "@devsnicket/eunice-dependency-and-structure";

export = Parameter

interface Parameter {
	createElement
	elementContainerFactory?: ElementContainerFactory
	getTextWidth
	namespaces?: Namespaces
	stack: Stack
	style?: String
	subsetIdentifierHierarchy?: String[]
}