import { ReactSVGElement } from "react";
import { Item } from "@devsnicket/eunice-dependency-and-structure";

export = ElementContainerFactory;

interface ElementContainerFactory {
	createForDependencyCount?:
		function({
			element: ReactSVGElement,
			item: Item,
			level: "above" | "below" | "self",
			relationship: "dependents" | "dependsUpon",
		}): ReactSVGElement

	createForItem?:
		function({
			element: ReactSVGElement,
			item: Item,
		}): ReactSVGElement;
}