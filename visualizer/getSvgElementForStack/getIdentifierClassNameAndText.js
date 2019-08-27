// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		baseClassName,
		identifier,
	}) => (
		{
			className:
				[
					baseClassName,
					...identifier ? [] : [ "anonymous" ],
				]
				.join(" "),
			text:
				identifier || "anonymous",
		}
	);