/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createUrlSearchParamsFromLocationHash from "./createUrlSearchParamsFromLocationHash";
import createValueObject from "./createValueObject";
import createWithFactoryFromUrlSearchParams from "./createWithFactoryFromUrlSearchParams";

export default
location => {
	return (
		{
			getValueOfKey:
				key =>
					createUrlSearchParams()
					.get(key),
			getValuesOfKeys:
				keys =>
					getValuesOfKeys({
						keys,
						urlSearchParams: createUrlSearchParams(),
					}),
			getWithKeyAndValue:
				keyAndValue =>
					createWithFactory()
					.getWithKeyAndValue(keyAndValue),
			getWithKeysAndValues:
				keysAndValues =>
					createWithFactory()
					.getWithKeysAndValues(keysAndValues),
			getWithoutKeys:
				keys =>
					createWithFactory()
					.getWithoutKeys(keys),
			setKeyAndValue:
				keyAndValue =>
					setHash(
						createWithFactory()
						.getWithKeyAndValue(
							keyAndValue,
						),
					),
			setKeysAndValues:
				keysAndValues =>
					setHash(
						createWithFactory()
						.getWithKeysAndValues(
							keysAndValues,
						),
					),
		}
	);

	function getValuesOfKeys({
		keys,
		urlSearchParams,
	}) {
		return (
			createValueObject({
				getValueForKey: key => urlSearchParams.get(key),
				keys,
			})
		);
	}

	function createWithFactory() {
		return (
			createWithFactoryFromUrlSearchParams(
				createUrlSearchParams(),
			)
		);
	}

	function createUrlSearchParams() {
		return (
			createUrlSearchParamsFromLocationHash(
				location.hash,
			)
		);
	}

	function setHash(
		hash,
	) {
		location.hash = hash;
	}
};