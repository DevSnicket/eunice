/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import "react-reflex/styles.css";
import "./index.css";

import createSplitterIcon from "./createSplitterIcon";

export default ({
	createElement,
	flexKeysAndValues,
	items,
	orientation,
	resizableElementTypes,
}) =>
	createElement(
		resizableElementTypes.container,
		{ orientation },
		createContainerChildElements({
			createElement,
			flexKeysAndValues,
			itemElementType:
				resizableElementTypes.item,
			items,
			splitter:
				{
					elementType:
						resizableElementTypes.splitter,
					icon:
						createSplitterIcon({
							createElement,
							orientation,
						}),
				},
		}),
	);

function createContainerChildElements({
	createElement,
	flexKeysAndValues,
	itemElementType,
	items,
	splitter,
}) {
	return (
		items.flatMap(
			withContext({
				createElement,
				createReflexSplitterForIndex:
					index =>
						createSplitterWhenSubsequent({
							createElement,
							index,
							...splitter,
						}),
				flexKeysAndValues,
				itemElementType,
			})
			.createSplitterAndElementForItemAndIndex,
		)
	);
}

function withContext({
	createElement,
	createReflexSplitterForIndex,
	flexKeysAndValues: { getValueOfKey, setKeyAndValue },
	itemElementType,
}) {
	return { createSplitterAndElementForItemAndIndex };

	function createSplitterAndElementForItemAndIndex(
		{ element, flex },
		index,
	) {
		return (
			[
				...createReflexSplitterForIndex(index),
				createItemElement(),
			]
		);

		function createItemElement() {
			return (
				createElement(
					itemElementType,
					{
						...createFlexProperty(),
						key:
							`element ${index}`,
						onStopResize:
							createOnStopResize(),
					},
					element,
				)
			);
		}

		function createFlexProperty() {
			return (
				flex
				&&
				createPropertyWhenHasValue(
					(flex.key && getValueOfKey(flex.key))
					||
					flex.default,
				)
			);

			function createPropertyWhenHasValue(
				value,
			) {
				return value && { flex: value };
			}
		}

		function createOnStopResize() {
			return (
				flex && flex.key
				&&
				onStopResize
			);

			function onStopResize(
				{ component },
			) {
				setKeyAndValue({
					key: flex.key,
					value: component.props.flex,
				});
			}
		}
	}
}

function * createSplitterWhenSubsequent({
	createElement,
	elementType,
	icon,
	index,
}) {
	if (index > 0)
		yield (
			createElement(
				elementType,
				{ key: `splitter ${index - 1}` },
				icon,
			)
		);
}