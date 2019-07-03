/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	{
		clearFromKeysAndValues,
		getKeysAndValuesFromObject,
		getObjectFromGetValueOfKey,
	};

function clearFromKeysAndValues(
	keysAndValues,
) {
	return (
		[
			...keysAndValues,
			...getKeysAndNoValues(),
		]
	);
}

function getKeysAndNoValues() {
	return (
		Object.values(keys)
		.map(key => ({ key }))
	);
}

function getObjectFromGetValueOfKey(
	getValueOfKey,
) {
	return (
		{
			identifier: getValueOfKey(keys.item),
			level: getValueOfKey(keys.level),
			relationship: getValueOfKey(keys.relationship),
		}
	);
}

function getKeysAndValuesFromObject({
	identifier,
	level,
	relationship,
}) {
	return (
		[
			{
				key: keys.item,
				value: identifier,
			},
			{
				key: keys.level,
				value: level,
			},
			{
				key: keys.relationship,
				value: relationship,
			},
		]
	);
}

const keys =
	{
		item: "dependency-list-item",
		level: "dependency-list-level",
		relationship: "dependency-list-relationship",
	};