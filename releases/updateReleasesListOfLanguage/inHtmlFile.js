import githubNodejsJsonRequest from "../../githubNodejsJsonRequest.js";
import requestAndFormatHtmlForReleasesList from "../requestAndFormatHtmlForReleasesList.js"
import updateInHtmlFile from "../../updateInHtmlFile.js";

export default async (
	language
) =>
	await updateInHtmlFile({
		content:
			await requestAndFormatHtmlForReleasesList({
				language,
				requestJsonFromUrl: githubNodejsJsonRequest,
			}),
		filePath:
			"./index.html",
		tag:
			"releasesList",
	});