/* Eunice
Copyright (c) 2018 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";
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