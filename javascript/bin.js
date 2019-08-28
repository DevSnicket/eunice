#!/usr/bin/env node
// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

/* istanbul ignore file: test would be a mirror of implementation */

const path = require("path");

console.log("Eunice Community/Trial Edition");
console.log();
console.log("By using this program you are agreeing to its license:");
console.log(`\t${path.join(__dirname, "LICENSE")}`);
console.log("\thttp://www.devsnicket.com/eunice/licensing/community-trial.txt");
console.log();
console.log("Analyzing...");

require(".");