/* istanbul ignore file: test would be a mirror of implementation */
const
	orderItemsByIdentifier = require("./orderItemsByIdentifier"),
	orderItemsByIndexOfIdentifierSuffix = require("./orderItemsByIndexOfIdentifierSuffix"),
	orderItemsByIndexOfType = require("./orderItemsByIndexOfType");

module.exports =
	{
		orderItemsByIdentifier,
		orderItemsByIndexOfIdentifierSuffix,
		orderItemsByIndexOfType,
	};