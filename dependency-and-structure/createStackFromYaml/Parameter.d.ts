import { Item, Yaml } from "..";

export = Parameter

interface Parameter {
	dependenciesInDescendantsOfItemPredicate?: function(Item): boolean
	yaml: Yaml
}