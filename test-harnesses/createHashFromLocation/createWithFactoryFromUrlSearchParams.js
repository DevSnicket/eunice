/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	urlSearchParams => {
		return (
			{
				getWithKeyAndValue,
				getWithKeysAndValues,
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

		function getHash() {
			return (
				addHashPrefix(
					urlSearchParams.toString(),
				)
			);
		}
	};

function addHashPrefix(
	value,
) {
	return (
		value
		&&
		`#${value}`
	);
}