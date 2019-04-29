const createItemElement = require("./createItemElement");

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