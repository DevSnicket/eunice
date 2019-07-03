/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createProcessFunctions = require("./createProcessFunctions");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		identifierSeparator,
		items,
		packagePrefixAndScope,
		rootItemIdentifier,
	}) =>
		invokeProcessFunctions({
			items,
			processFunctions:
				createProcessFunctions({
					directoryToCreateOrAddToStacksFrom,
					identifierSeparator,
					packagePrefixAndScope,
					rootItemIdentifier,
				}),
		});

function invokeProcessFunctions({
	items,
	processFunctions,
}) {
	return (
		processFunctions.reduce(
			(itemsAggregation, processFunction) =>
				processFunction(itemsAggregation),
			items,
		)
	);
}