import githubNodejsJsonRequest from "../../githubNodejsJsonRequest.js";
import requestAndFormatHtmlForReleasesList from "../requestAndFormatHtmlForReleasesList.js"
import { updateInHtmlIndexFile } from "../../textFiles.js";

export default language =>
	requestAndFormatHtmlForReleasesList({
		language,
		requestJsonFromUrl: githubNodejsJsonRequest,
	})
	.then(
		html =>
			updateInHtmlIndexFile({
				content: html,
				tag: "releasesList",
			}),
	);