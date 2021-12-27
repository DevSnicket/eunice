// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import path from "path";

export default ({
	directory,
	file,
}) =>
	createForSubdirectory({
		directory,
		subdirectory:
			path.dirname(file),
	});

function createForSubdirectory({
	directory,
	subdirectory,
}) {
	return (
		{
			absolute:
				subdirectory,
			relative:
				path.relative(
					directory,
					subdirectory,
				),
		}
	);
}