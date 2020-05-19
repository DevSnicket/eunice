import nodejsJsonRequest from "../../nodejsJsonRequest.js";
import requestAndFormatHtmlForReleasesList from "./requestAndFormatHtmlForReleasesList.js"
import { updateInHtmlIndexFile } from "../../textFiles.js";

requestAndFormatHtmlForReleasesList(
	nodejsJsonRequest,
)
.then(
	html =>
		updateInHtmlIndexFile({
			content: html,
			tag: "releasesList",
		}),
);