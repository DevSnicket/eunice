import githubNodejsJsonRequest from "../../githubNodejsJsonRequest.js";
import requestAndFormatHtmlForReleasesList from "../requestAndFormatHtmlForReleasesList.js"
import updateInHtmlFile from "../../updateInHtmlFile.js";

export default async (
	language
) =>
	await updateInHtmlFile({
		filePath:
			"./index.html",
		replacements: [ {
			content:
				await requestAndFormatHtmlForReleasesList({
					language,
					requestJsonFromUrl: githubNodejsJsonRequest,
				}),
			tag:
				"releasesList",
		} ],
	});