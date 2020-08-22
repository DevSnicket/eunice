// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { default as createAreDependenciesOfAncestorsIncludedSelection, key } from ".";

test.each([
	[ null, true, true ],
	[ "true", false, null ],
])(
	"checkbox with get value of %s on changed to check %s sets value to %s",
	(previousValue, checked, expectedValue) => {
		const areDependenciesOfAncestorsIncludedSelection =
			createAreDependenciesOfAncestorsIncludedSelection({
				areIncludedDefault:
					null,
				getValueOfKey,
			});

		let actualKeyAndValue = null;

		areDependenciesOfAncestorsIncludedSelection.createSelectorElement({
			createElement,
			setKeyAndValue:
				keyAndValue => actualKeyAndValue = keyAndValue,
		});

		expect(actualKeyAndValue)
		.toEqual({
			key,
			value: expectedValue,
		});

		function getValueOfKey(
			actualKey,
		) {
			if (actualKey === key)
				return previousValue;
			else
				throw Error(`Unexpected key of "${actualKey}" not "${key}".`);
		}

		function createElement(
			type,
			properties,
		) {
			if (isCheckbox())
				properties.onChange({ target: { checked } });

			function isCheckbox() {
				return (
					type === "input"
					&&
					properties.type === "checkbox"
				);
			}
		}
	},
);