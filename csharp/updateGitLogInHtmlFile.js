import formatHtmlForGitLog from "./formatHtmlForGitLog.js";
import { readTextFile, updateInHtmlIndexFile } from "../textFiles.js";

readTextFile(
	"./git-log.txt",
	log =>
		updateInHtmlIndexFile({
			content:
				formatHtmlForGitLog(
					log,
				),
			tag:
				"gitLog",
		}),
);