const
	createListElement = require("./createListElement"),
	createSubsetOfItem = require("./createSubsetOfItem"),
	createWithVerticalResize = require("./createWithVerticalResize"),
	{
		findDirectionBetweenItemsInFirstMutualStack,
		findItemInStackWithIdentifierHierarchy,
		isInnerStack,
	} = require("@devsnicket/eunice-dependency-and-structure"),
	isDependencyRelevant = require("./isDependencyRelevant");

module.exports =
	({
		createElement,
		element,
		identifier,
		level,
		resizableElementTypes,
		relationship,
		stack,
		subsetIdentifierHierarchy,
	}) => {
		return (
			createListInContainerWhenAny()
			||
			element
		);

		function createListInContainerWhenAny() {
			return (
				allParametersSpecified()
				&&
				createWithElementsInVerticalResize(
					createListElement({
						createElement,
						relationship,
						subset: createSubset(),
					}),
				)
			);
		}

		function allParametersSpecified() {
			return (
				identifier
				&&
				level
				&&
				relationship
			);
		}

		function createSubset() {
			const item =
				findItemInStackWithIdentifierHierarchy({
					identifierHierarchy:
						[
							...subsetIdentifierHierarchy || [],
							identifier,
						],
					stack,
				});

			return (
				createSubsetOfItem({
					isDependencyRelevant:
						dependency =>
							isDependencyRelevant({
								dependency,
								findDirectionBetweenItemsInFirstMutualStack,
								isInnerStack,
								item,
								level,
							}),
					item,
					relationship,
				})
			);
		}

		function createWithElementsInVerticalResize(
			lowerElement,
		) {
			return (
				lowerElement
				&&
				createWithVerticalResize({
					createElement,
					elements:
						{
							lower: lowerElement,
							upper: element,
						},
					resizableElementTypes,
				})
			);
		}
	};