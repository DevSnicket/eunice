/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	areIncludedDefault,
	getValueOfKey,
}) =>
	withAreIncluded(
		areIncludedDefault
		||
		getValueOfKey(key) === "true",
	);

function withAreIncluded(
	areIncluded,
) {
	return {
		areIncluded,
		createSelectorElement,
	};

	function createSelectorElement({
		createElement,
		setKeyAndValue,
	}) {
		const inputIdentifier = "are-dependencies-of-ancestors-included";

		return (
			createElement(
				"label",
				{ htmlFor: inputIdentifier },
				createInput(),
				"show outer dependencies",
			)
		);

		function createInput() {
			return (
				createElement(
					"input",
					{
						checked:
							areIncluded,
						id:
							inputIdentifier,
						onChange,
						type:
							"checkbox",
					},
				)
			);

			function onChange(
				{ target: { checked } },
			) {
				return (
					setKeyAndValue({
						key,
						value:
							checked || null,
					})
				);
			}
		}
	}
}

export const key = "dependencies-of-ancestors";