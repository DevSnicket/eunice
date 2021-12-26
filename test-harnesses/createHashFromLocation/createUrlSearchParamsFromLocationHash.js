/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import UrlSearchParams from "@ungap/url-search-params";

export default
locationHash =>
	whenHasValue(
		locationHash,
	)
	||
	new UrlSearchParams();

function whenHasValue(
	locationHash,
) {
	return (
		locationHash
		&&
		createUrlSearchParams(
			removeHashPrefix(
				locationHash,
			),
		)
	);
}

function removeHashPrefix(
	locationHash,
) {
	if (!locationHash.startsWith("#"))
		throw Error("Location hash must start with a hash character.");

	return locationHash.substring(1);
}

function createUrlSearchParams(
	value,
) {
	return (
		value
		&&
		new UrlSearchParams(value)
	);
}