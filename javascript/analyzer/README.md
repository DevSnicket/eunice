# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/default-height.svg?sanitize=true) Javascript analyzer

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice)

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-javascript-analyzer.svg)](https://www.npmjs.com/package/@devsnicket/eunice-javascript-analyzer
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-javascript-analyzer.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-javascript-analyzer) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-javascript-analyzer/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-javascript-analyzer?branch=master) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package analyzes Javascript files/directories and writes a YAML file of the dependencies. These YAML file can then be processed, rendered and interacted with using the rest of [Eunice](https://www.github.com/DevSnicket/Eunice).

>[try out Javascript &rightarrow; YAML](https://devsnicket.github.io/eunice-javascript-analyzer/index.html)

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-javascript-analyzer):

```bash
npm install --save-dev @devsnicket/eunice-javascript-analyzer
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-javascript-analyzer):

```bash
yarn add --dev @devsnicket/eunice-javascript-analyzer
```

Examples of analyzer behavior can be found in the following test cases:
* [single file](getYamlFromJavaScript/test-cases)
* [multiple files and directories](getOrCreateItemsInDirectory/test-cases)