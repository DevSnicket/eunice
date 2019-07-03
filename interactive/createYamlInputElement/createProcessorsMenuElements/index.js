/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createItemElement = require("./createItemElement");

require("./index.css");

module.exports =
	({
		createElement,
		processors,
		setProcessors,
	}) => {
		return (
			createMenuElements({
				createElement,
				itemElements: createMenuItemElements(),
			})
		);

		function createMenuItemElements() {
			return (
				processors.map(
					processor =>
						createItemElement({
							createElement,
							processor,
							setState:
								state =>
									setProcessors(
										getAndCreateProcessorsWithState({
											processors,
											state,
											targetProcessor: processor,
										}),
									),
						}),
				)
			);
		}
	};

function getAndCreateProcessorsWithState({
	processors,
	state,
	targetProcessor,
}) {
	return (
		processors.map(
			processor =>
				processor === targetProcessor
				?
				{
					...processor,
					...state,
				}
				:
				processor,
		)
	);
}

function createMenuElements({
	createElement,
	itemElements,
}) {
	const
		className = "popup menu",
		inputId = "processor-menu";

	return (
		[
			createElement(
				"input",
				{
					className,
					id: inputId,
					type: "checkbox",
				},
			),
			createElement(
				"label",
				{
					className,
					htmlFor: inputId,
				},
				"processors",
			),
			createElement(
				"ul",
				{
					className,
					style: { flexBasis: "100%" },
				},
				...itemElements,
			),
		]
	);
}