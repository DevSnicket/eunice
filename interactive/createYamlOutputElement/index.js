/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createElementsFromYaml = require("./createElementsFromYaml"),
	getProcessedYamlFromState = require("./getProcessedYamlFromState");

module.exports =
	({
		callOrCreateElementOnError,
		createElement,
		location,
		resizableElementTypes,
		state,
	}) =>
		callOrInProductionCreateElementOnError({
			action:
				() =>
					createElementsFromYaml({
						createElement,
						locationHash: location.hash,
						resizableElementTypes,
						yaml: getProcessedYamlFromState(state),
					}),
			callOrCreateElementOnError,
			createElement,
		});

function callOrInProductionCreateElementOnError({
	action,
	callOrCreateElementOnError,
	createElement,
}) {
	return (
		// this is the only place process environment is used
		// eslint-disable-next-line no-process-env
		process.env.NODE_ENV === "production"
		?
		callOrCreateElementOnError({
			action,
			createElement,
		})
		:
		action()
	);
}