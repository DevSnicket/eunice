const UrlSearchParams = require("@ungap/url-search-params");

module.exports =
	locationHash =>
		createUrlSearchParamsWhenLocationHashHasValues(
			locationHash,
		)
		||
		new UrlSearchParams();

function createUrlSearchParamsWhenLocationHashHasValues(
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