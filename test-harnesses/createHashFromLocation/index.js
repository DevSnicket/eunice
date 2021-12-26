/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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