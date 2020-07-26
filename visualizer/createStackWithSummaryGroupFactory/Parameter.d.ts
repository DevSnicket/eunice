import { Stack } from "@devsnicket/eunice-dependency-and-structure";
import ElementContainerFactory from "./ElementContainerFactory";

export = Parameter

interface Parameter {
	arrows
	elementContainerFactory: ElementContainerFactory
	createTextGroup
	font
	stack: Stack
}