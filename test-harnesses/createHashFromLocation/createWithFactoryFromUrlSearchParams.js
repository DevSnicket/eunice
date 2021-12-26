/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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