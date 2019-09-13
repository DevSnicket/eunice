// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({ isColorSupported }) => {
		return whenSupported() || withNoFormatting();

		function whenSupported() {
			return (
				isColorSupported
				&&
				{
					formatBold,
					formatGreen,
					formatRed,
				}
			);
		}

		function withNoFormatting() {
			return (
				{
					formatBold: text => text,
					formatGreen: text => text,
					formatRed: text => text,
				}
			);
		}
	};

function formatBold(
	text,
) {
	return (
		formatWithCodes({
			off: 22,
			on: 1,
			text,
		})
	);
}

function formatGreen(
	text,
) {
	return formatColor({ color: 32, text });
}

function formatRed(
	text,
) {
	return formatColor({ color: 31, text });
}

function formatColor({
	color,
	text,
}) {
	return (
		formatWithCodes({
			off: 39,
			on: color,
			text,
		})
	);
}

function formatWithCodes({
	off,
	on,
	text,
}) {
	return (
		formatAnsiEscapeCode(on)
		+
		text
		+
		formatAnsiEscapeCode(off)
	);
}

function formatAnsiEscapeCode(
	code,
) {
	return `\x1b[${code}m`;
}