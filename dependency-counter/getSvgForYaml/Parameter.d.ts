import ElementContainerFactory from "../getSvgElementForStack/createStackWithSummaryGroupFactory/ElementContainerFactory";
import Namespaces from "../getSvgElementForStack/Namespaces"
import { Stack } from "@devsnicket/eunice-dependency-and-structure";

export = Parameter

interface Parameter {
	elementContainerFactory?: ElementContainerFactory
	namespaces?: Namespaces
	style?: string
	subsetIdentifierHierarchy?: string[]
	yaml: string
}