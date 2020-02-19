// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import fs from "fs";

export default
async file =>
	removeBom(
		await fs.readFileSync(
			file,
			"utf-8",
		),
	);

function removeBom(
	text,
) {
	return (
		text.replace(
			/^\uFEFF/,
			"",
		)
	);
}