/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatmap")
.shim();

const
	{ createElement } = require("react"),
	{
		ReflexContainer,
		ReflexElement,
		ReflexSplitter,
	} = require("react-reflex");

require("react-reflex/styles.css");
require("./index.css");

module.exports =
	({
		columns,
		flexKeysAndValues,
	}) =>
		createElement(
			ReflexContainer,
			{ orientation: "vertical" },
			createElements({
				columns,
				flexKeysAndValues,
			}),
		);

function createElements({
	columns,
	flexKeysAndValues,
}) {
	return (
		columns.flatMap(
			withFlexKeysAndValues(flexKeysAndValues)
			.createSplitterAndElementForColumnAndIndex,
		)
	);
}

function withFlexKeysAndValues({
	getValueOfKey,
	setKeyAndValue,
}) {
	return { createSplitterAndElementForColumnAndIndex };

	function createSplitterAndElementForColumnAndIndex(
		{ element, flex },
		index,
	) {
		return (
			[
				...createReflexSplitterWithIndexWhenSubsequent(index),
				createReflexElement(),
			]
		);

		function createReflexElement() {
			return (
				createElement(
					ReflexElement,
					{
						...createFlexProperty(),
						key:
							`element ${index}`,
						onStopResize:
							({ component }) =>
								setFlex(
									component.props.flex,
								),
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

		function setFlex(
			value,
		) {
			if (flex && flex.key)
				setKeyAndValue({
					key: flex.key,
					value,
				});
		}
	}
}

function * createReflexSplitterWithIndexWhenSubsequent(
	index,
) {
	if (index > 0)
		yield (
			createElement(
				ReflexSplitter,
				{ key: `splitter ${index - 1}` },
				createElement("div", null, "|".repeat(3)),
			)
		);
}