/* istanbul ignore file: test would be a mirror of implementation */
const
	createOrAddToStacksToItemsWithIdentifier = require("./createOrAddToStacksToItemsWithIdentifier"),
	createOrAddToStacksUniformly = require("./createOrAddToStacksUniformly"),
	createOrAddToStacksUsingFileSystem = require("./createOrAddToStacksUsingFileSystem");

module.exports =
	{
		createOrAddToStacksToItemsWithIdentifier,
		createOrAddToStacksUniformly,
		createOrAddToStacksUsingFileSystem,
	};