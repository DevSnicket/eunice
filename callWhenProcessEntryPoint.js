const
	minimist = require("minimist"),
	yaml = require("js-yaml");

module.exports =
	(
		action,
		{ standardInputParameter = null } = { standardInputParameter: null }
	) => {
		return isMain() && callWithProcessArgumentsAndStandardStreams();

		function isMain() {
			return require.main === module.parent;
		}

		function callWithProcessArgumentsAndStandardStreams() {
			const processArguments = minimist(process.argv.slice(2));

			const standardInputArgument = processArguments[standardInputParameter];

			if (!standardInputParameter || standardInputArgument)
				callWithItems(standardInputArgument);
			else
				callWithProcessArgumentsAndStandardInputStream();

			function callWithProcessArgumentsAndStandardInputStream() {
				const standardIn = process.stdin;

				standardIn.resume();
				standardIn.setEncoding("utf8");

				let input = "";

				standardIn.on(
					"data",
					chunk => input += chunk
				);

				standardIn.on(
					"end",
					() => callWithItems(input)
				);
			}

			function callWithItems(
				items
			) {
				// eslint-disable-next-line no-console
				console.log(
					yaml.safeDump(
						action({
							...processArguments,
							items: yaml.safeLoad(items),
						}),
						{ lineWidth: Number.MAX_SAFE_INTEGER }
					)
				);
			}
		}
	};