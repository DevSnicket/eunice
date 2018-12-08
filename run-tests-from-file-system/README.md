# Eunice [![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows/testcase.svg)

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Euince's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice/renderer/harness.html) ([created with](dogfooding/generate.sh))

## Run tests from file system

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-run-tests-from-file-system.svg)](https://www.npmjs.com/package/@devsnicket/eunice-run-tests-from-file-system
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-run-tests-from-file-system.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-run-tests-from-file-system) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package is used to help create [Jest](https://jestjs.io/) tests for other [Eunice](https://github.com/DevSnicket/Eunice) packages. 

It runs tests by reading test cases and expected behaviour from the file system. Tests are automatically named based on the directory hierarchy.

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-run-tests-from-file-system):

```bash
npm install --save-dev @devsnicket/eunice-run-tests-from-file-system.
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-run-tests-from-file-system):

```bash
yarn add --dev @devsnicket/eunice-run-tests-from-file-system.
```
