// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	areIncludedDefault,
	getValueOfKey,
}) =>
	withAreIncluded(
		areIncludedDefault
		||
		getValueOfKey(key) === "true",
	);

function withAreIncluded(
	areIncluded,
) {
	return {
		areIncluded,
		createSelectorElement,
	};

	function createSelectorElement({
		createElement,
		setKeyAndValue,
	}) {
		const inputIdentifier = "are-dependencies-of-ancestors-included";

		return (
			createElement(
				"label",
				{ htmlFor: inputIdentifier },
				createInput(),
				"ancestor dependencies",
			)
		);

		function createInput() {
			return (
				createElement(
					"input",
					{
						checked:
							areIncluded,
						id:
							inputIdentifier,
						onChange,
						type:
							"checkbox",
					},
				)
			);

			function onChange(
				{ target: { checked } },
			) {
				return (
					setKeyAndValue({
						key,
						value:
							checked || null,
					})
				);
			}
		}
	}
}

export const key = "dependencies-of-ancestors";