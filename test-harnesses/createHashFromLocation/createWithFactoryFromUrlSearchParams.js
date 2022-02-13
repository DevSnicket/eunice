/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default
urlSearchParams => {
	return (
		{
			getWithKeyAndValue,
			getWithKeysAndValues,
			getWithoutKeys,
		}
	);

	function getWithKeysAndValues({
		keys,
		values,
	}) {
		for (const [ property, key ] of Object.entries(keys))
			setWhenHasValueOrDelete({
				key,
				value: values[property],
			});

		return getHash();
	}

	function getWithKeyAndValue({
		key,
		value,
	}) {
		setWhenHasValueOrDelete({
			key,
			value,
		});

		return getHash();
	}

	function setWhenHasValueOrDelete({
		key,
		value,
	}) {
		if (value)
			urlSearchParams.set(
				key,
				value,
			);
		else
			urlSearchParams.delete(
				key,
			);
	}

	function getWithoutKeys(
		keys,
	) {
		for (const key of Object.values(keys))
			urlSearchParams.delete(key);

		return getHash();
	}

	function getHash() {
		return `#${urlSearchParams.toString()}`;
	}
};