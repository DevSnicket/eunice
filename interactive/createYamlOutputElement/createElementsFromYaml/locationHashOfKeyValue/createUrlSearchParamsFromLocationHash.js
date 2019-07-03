/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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