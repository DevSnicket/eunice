# Eunice ![](https://raw.githubusercontent.com/DevSnicket/eunice-renderer/master/getSvgElementForStack/createArrows/test/withUse/testCases/default-height.svg?sanitize=true) Call with process standard streams

DevSnicket Eunice is a toolkit based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Eunice's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice)

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-call-with-process-standard-streams.svg)](https://www.npmjs.com/package/@devsnicket/eunice-call-with-process-standard-streams
) [![Build Status](https://travis-ci.org/DevSnicket/eunice-call-with-process-standard-streams.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-call-with-process-standard-streams) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

This package calls a specified function with arguments taken from the process and standard input streams. The return value is written to the standard output stream with console.log (e.g. a string).

It depends upon [minimist](https://github.com/substack/minimist) to parse the arguments.

Its used by Eunice JavaScript analyzer, processors and renderer so they can be run from CLI and scripts, and have large amounts of YAML passed into and out of them. More information can be found [in the main Eunice repository](https://github.com/DevSnicket/Eunice#readme).

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-call-with-process-standard-streams):

```bash
npm install @devsnicket/eunice-call-with-process-standard-streams
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-call-with-process-standard-streams):

```bash
yarn add @devsnicket/eunice-call-with-process-standard-streams
```
