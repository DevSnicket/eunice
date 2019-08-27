// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	value => {
		return whenHasExtension() || value;

		function whenHasExtension() {
			const jsExtension = ".js";

			return (
				value
				&&
				value.endsWith(jsExtension)
				&&
				removeExtension()
			);

			function removeExtension() {
				return (
					value.substring(
						0,
						value.length - jsExtension.length,
					)
				);
			}
		}
	};