import formatHtmlForGitLog from "./formatHtmlForGitLog.js";
import { readTextFile, updateParagraphInHtmlIndexFile } from "../textFiles.js";

readTextFile(
	"./git-log.txt",
	log =>
		updateParagraphInHtmlIndexFile({
			content:
				formatHtmlForGitLog(
					log,
				),
			paragraphIdentifier:
				"git-log",
		}),
);