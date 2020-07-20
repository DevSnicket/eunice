import nodejsJsonRequest from "../../nodejsJsonRequest.js";
import requestAndFormatHtmlForReleasesList from "../requestAndFormatHtmlForReleasesList.js"
import { updateInHtmlIndexFile } from "../../textFiles.js";

export default language =>
	requestAndFormatHtmlForReleasesList({
		language,
		requestJsonFromUrl: nodejsJsonRequest,
	})
	.then(
		html =>
			updateInHtmlIndexFile({
				content: html,
				tag: "releasesList",
			}),
	);