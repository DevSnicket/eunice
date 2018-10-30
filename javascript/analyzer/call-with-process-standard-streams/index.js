const minimist = require("minimist");

module.exports =
	({
		action,
		parentModule = module.parent,
		standardInputParameter = null,
	}) => {
		return isMain() && callWithProcessArgumentsAndStandardStreams();

		function isMain() {
			return require.main === parentModule;
		}

		function callWithProcessArgumentsAndStandardStreams() {
			const processArguments = minimist(process.argv.slice(2));

			if (standardInputParameter && !processArguments[standardInputParameter])
				callWithProcessArgumentsAndStandardInputStream();
			else
				call(processArguments);

			function callWithProcessArgumentsAndStandardInputStream() {
				const standardIn = process.stdin;

				standardIn.resume();
				standardIn.setEncoding("utf8");

				let input = "";

				standardIn.on(
					"data",
					chunk => input += chunk,
				);

				standardIn.on(
					"end",
					() =>
						call({
							...processArguments,
							[standardInputParameter]: input,
						}),
				);
			}

			function call(
				processArgumentsAndOrStandardInput,
			) {
				// eslint-disable-next-line no-console
				console.log(
					action(
						processArgumentsAndOrStandardInput,
					),
				);
			}
		}
	};