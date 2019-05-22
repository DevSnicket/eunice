module.exports =
	({
		packagePrefix,
		yaml,
	}) => {
		return (
			whenHasPackagePrefix()
			||
			yaml
		);

		function whenHasPackagePrefix() {
			return (
				packagePrefix
				&&
				yaml
				.replace(
					createRemovePrefixFromYamlRegExp(),
					"$1",
				)
			);
		}

		function createRemovePrefixFromYamlRegExp() {
			return (
				new RegExp(
					escapeYamlString(`${packagePrefix}(.*)`),
					"g",
				)
			);
		}

		function escapeYamlString(
			yamlString,
		) {
			return (
				packagePrefix.includes("@")
				?
				`'${yamlString}'`
				:
				yamlString
			);
		}
	};