/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createUrlSearchParamsFromLocationHash = require("./createUrlSearchParamsFromLocationHash");

module.exports =
	{
		getValue:
			({
				key,
				locationHash,
			}) =>
				createUrlSearchParamsFromLocationHash(
					locationHash,
				)
				.get(
					key,
				),
		getWithKeysAndValues:
			({
				keysAndValues,
				locationHash,
			}) =>
				getWithKeysAndValues({
					keysAndValues,
					urlSearchParams:
						createUrlSearchParamsFromLocationHash(
							locationHash,
						),
				}),
	};

function getWithKeysAndValues({
	keysAndValues,
	urlSearchParams,
}) {
	for (const { key, value } of keysAndValues)
		setWhenHasValueOrDelete({
			key,
			urlSearchParams,
			value,
		});

	return (
		addHashPrefix(
			urlSearchParams.toString(),
		)
	);
}

function setWhenHasValueOrDelete({
	key,
	urlSearchParams,
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

function addHashPrefix(
	value,
) {
	return (
		value
		&&
		`#${value}`
	);
}