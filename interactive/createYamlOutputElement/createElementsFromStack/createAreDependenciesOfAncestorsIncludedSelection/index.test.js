/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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