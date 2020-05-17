import fileSystem from "fs";
import formatHtmlForGitLog from "./formatHtmlForGitLog.js";

const encoding = "utf-8";

readTextFile(
	"./git-log.txt",
	log =>
		writeGitLogHtml(
			formatHtmlForGitLog(
				log,
			),
		),
);

function writeGitLogHtml(
	gitLogHtml,
) {
	const pageFilePath = "./index.html";

	readTextFile(
		pageFilePath,
		pageHtml =>
			fileSystem.writeFileSync(
				pageFilePath,
				pageHtml.replace(
					/(?<=<p id="git-log">).*(?=<\/p>)/,
					gitLogHtml,
				),
				encoding,
			),
	);
}

function readTextFile(
	filePath,
	callback,
) {
	fileSystem.readFile(
		filePath,
		encoding,
		(error, log) => {
			if (error)
				throw error;
			else
				callback(log);
		}
	);
}