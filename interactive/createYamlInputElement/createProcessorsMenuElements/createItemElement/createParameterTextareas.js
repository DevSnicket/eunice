module.exports =
	({
		createElement,
		processor,
		setState,
	}) => {
		return (
			createWhenNone()
			||
			createWhenMultiple()
			||
			createWhenSingle()
		);

		function createWhenNone() {
			return !processor.parameter && [];
		}

		function createWhenMultiple() {
			return (
				processor.parameter.isMultiple
				&&
				(processor.argument ? createMultiple() : [ createWithIndex(0) ])
			);

			function * createMultiple() {
				for (let index = 0; index <= processor.argument.length; index++)
					yield createWithIndex(index);
			}

			function createWithIndex(
				index,
			) {
				return (
					createWithGetArgumentFromValue(
						value =>
							processor.argument
							?
							[
								...processor.argument.slice(0, index),
								...value.length ? [ value ] : [],
								...processor.argument.slice(index + 1),
							]
							:
							[ value ],
					)
				);
			}
		}

		function createWhenSingle() {
			return [ createWithGetArgumentFromValue(value => value) ];
		}

		function createWithGetArgumentFromValue(
			getArgumentFromValue,
		) {
			return (
				createElement(
					"textarea",
					{
						onChange:
							event =>
								setState({ argument: getArgumentFromValue(event.target.value) }),
						rows:
							1,
						style:
							{
								flexGrow: 1,
								marginLeft: "1em",
								minWidth: "8em",
							},
					},
				)
			);
		}
	};