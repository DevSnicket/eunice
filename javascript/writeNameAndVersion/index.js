// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createAnsiEscapeCodeFormatter from "./createAnsiEscapeCodeFormatter";

export default ({
	isColorSupported,
	log,
	version,
}) => {
	const
		{
			formatGreen,
			formatRed,
		} = createAnsiEscapeCodeFormatter({ isColorSupported });

	log();
	log(`${formatRed("e")}${formatGreen("uni")}${formatRed("ce")} for JavaScript ${version}`);
	log();
};