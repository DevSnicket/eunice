import ElementContainerFactory from "./createStackWithSummaryGroupFactory/ElementContainerFactory";
import { Stack } from "@devsnicket/eunice-dependency-and-structure";

export = Parameter

interface Parameter {
	createElement
	elementContainerFactory?: ElementContainerFactory
	getTextWidth
	namespaces?: any[]
	stack: Stack
	style?: String
	subsetIdentifierHierarchy?: String[]
}