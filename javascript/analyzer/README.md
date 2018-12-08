# Eunice [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows/testcase.svg)

[![Build Status](https://travis-ci.org/DevSnicket/eunice-javascript-analyzer.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-javascript-analyzer) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/eunice-javascript-analyzer/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-javascript-analyzer?branch=master) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

## Premise

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Euince's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice-harnesses/Renderer/harness.html) ([created with](dogfooding/generate.sh))

## JavaScript analyzer

This package analyzes JavaScript files/directories and writes a YAML file of the dependencies. These YAML file can then be processed, rendered and interacted with using the rest of [Eunice](https://www.github.com/DevSnicket/Eunice).

>[try out JavaScript &rightarrow; YAML](https://devsnicket.github.io/eunice-javascript-analyzer/harness.html)

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-javascript-analyzer.svg)](https://www.npmjs.com/package/@devsnicket/eunice-javascript-analyzer
)

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-javascript-analyzer):

```bash
npm install --save-dev @devsnicket/eunice-javascript-analyzer
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-javascript-analyzer):

```bash
yarn add --dev @devsnicket/eunice-javascript-analyzer
```
