# Eunice [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows/testcase.svg)

[![Build Status](https://travis-ci.org/DevSnicket/eunice-call-when-process-entry-point.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-call-when-process-entry-point) [![Gitter chat](https://badges.gitter.im/devsnicket-eunice/gitter.png)](https://gitter.im/devsnicket-eunice)

## Call when process entry point

This package detects when its callee is the process entry point (e.g. from CLI and scripts), and makes arguments and standard input available to a function.

It depends upon [minimist](https://github.com/substack/minimist) to parse the arguments.

Used by [Eunice](https://github.com/DevSnicket/Eunice) JavaScript analyzer, processors and renderer so they can be run from CLI and scripts, and have large amounts of YAML passed into (and out of) them.

[![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-call-when-process-entry-point.svg)](https://www.npmjs.com/package/@devsnicket/eunice-call-when-process-entry-point
)

Install using [`npm`](https://www.npmjs.com/package/@devsnicket/eunice-call-when-process-entry-point):

```bash
npm install @devsnicket/eunice-call-when-process-entry-point
```
Or with [`yarn`](https://yarnpkg.com/en/package/@devsnicket/eunice-call-when-process-entry-point):

```bash
yarn add @devsnicket/eunice-call-when-process-entry-point
```
