import ElementContainerFactory from "./createStackWithSummaryGroupFactory/ElementContainerFactory";
import Namespaces from "./Namespaces"
import Stack from "@devsnicket/eunice-dependency-counter/Stack.d";

export = Parameter

interface Parameter {
	createElement
	elementContainerFactory?: ElementContainerFactory
	getTextWidth
	namespaces?: Namespaces
	stack: Stack
	style?: string
	subsetIdentifierHierarchy?: string[]
}