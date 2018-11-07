module.exports =
	({
		createElement,
		resizableColumn,
		stateful,
	}) => {
		return (
			{
				createResizableColumn,
				createResizableColumnForInput,
				createResizableColumnForOutput,
			}
		);

		function createResizableColumnForInput({
			createStateFromValue,
			title,
			value,
		}) {
			return (
				createResizableColumn({
					element:
						createElement(
							"textarea",
							{
								onChange: event => stateful.setState(createStateFromValue(event.target.value)),
								value,
							},
						),
					title,
				})
			);
		}

		function createResizableColumnForOutput({
			title,
			value,
		}) {
			return (
				createResizableColumn({
					element:
						createElement(
							"div",
							{ style: { flex: 1 } },
							value,
						),
					title,
				})
			);
		}

		function createResizableColumn({
			element,
			title,
		}) {
			return (
				createElement(
					resizableColumn,
					{ key: `${title} column` },
					createElement(
						"div",
						{ className: "column" },
						title,
						element,
					),
				)
			);
		}
	};