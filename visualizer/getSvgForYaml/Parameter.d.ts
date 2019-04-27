import ElementContainerFactory from "./createStackWithSummaryGroupFactory/ElementContainerFactory";
import { Stack } from "@devsnicket/eunice-dependency-and-structure";

export = Parameter

interface Parameter {
	elementContainerFactory?: ElementContainerFactory
	namespaces?: any[]
	style?: string
	subsetIdentifierHierarchy?: string[]
	yaml: string
}