# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/default-height.svg?sanitize=true) Run tests from file system

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice/renderer/harness.html) ([created with](dogfooding/generate.sh))

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-run-tests-from-file-system.svg)](https://www.npmjs.com/package/@devsnicket/eunice-run-tests-from-file-system
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-run-tests-from-file-system.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-run-tests-from-file-system) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package is used to help create [Jest](https://jestjs.io/) tests for other [Eunice](https://github.com/DevSnicket/Eunice) packages. 

It runs tests by reading test cases and expected behavior from the file system. Tests are automatically named based on the directory hierarchy.

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-run-tests-from-file-system):

```bash
npm install --save-dev @devsnicket/eunice-run-tests-from-file-system.
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-run-tests-from-file-system):

```bash
yarn add --dev @devsnicket/eunice-run-tests-from-file-system.
```
